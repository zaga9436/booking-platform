import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SeatStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateBookingDto){
    return this.prisma.$transaction(async (tx) => {
      const seat = await tx.seat.findUnique({
        where: { id: dto.seatId },
      });
      if (!seat) throw new NotFoundException("Seat not found");
      if (seat.status === SeatStatus.SOLD){
        throw new BadRequestException("Seat is already taken");
      }

      await tx.seat.update({
        where: { id: dto.seatId },
        data: { status: SeatStatus.SOLD },
      });

      const booking = await tx.booking.create({
        data: {
          userId,
          seatId: dto.seatId,
          status: 'PENDING',
        },
      });
      return booking;
    });
  }

  async findMyBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId }, 
      include: {
        seat: {
          include: { event: true }
        }
      }
    });
  }
 
}
