import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private readonly jwtService: JwtService) {}

    async register(dto: RegisterDto){
        const oldUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (oldUser) {
            throw new BadRequestException('User already exists');
        }

        const passwordHash = await argon2.hash(dto.password);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: passwordHash,
            },
        });

        return {
            id: user.id,
            email: user.email,
        };
    }

    async login(dto: LoginDto, res: Response){
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isValid = await argon2.verify(user.password, dto.password);
        if (!isValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user.id,
            email: user.email
        };
        
        const accessToken = await this.jwtService.signAsync(payload);
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1000 * 60 * 24 * 7,
        });

        return { message: 'Logged in successfuly' };
    }

}
