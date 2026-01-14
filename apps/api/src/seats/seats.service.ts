import { Injectable } from '@nestjs/common';
import { CreateSeatsBatchDto } from './dto/create-seat.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SeatStatus } from '@prisma/client';

@Injectable()
export class SeatsService {
  constructor(private prisma: PrismaService){}

  async createBatch(dto: CreateSeatsBatchDto) {
    const seats = [];
    for (let row: number = 1; row <= dto.rows; row++) {
      for (let seatNum: number = 1; seatNum <= dto.seatsPerRow; seatNum++){
        seats.push({
          row: row,
          number: seatNum,
          eventId: dto.eventId,
          price: dto.price,
          status: SeatStatus.AVAILABLE
        });
      }
    }    
    return await this.prisma.seat.createMany({
      data: seats,
      skipDuplicates: true,
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.seat.findMany({
      where: { eventId },
      orderBy: [
        { row: 'asc' }, 
        { number: 'asc' }
      ]
    });
  }
}
