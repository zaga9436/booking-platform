import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

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
}
