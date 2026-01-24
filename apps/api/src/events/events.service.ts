import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';
import { EventCategory } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        name: dto.name,
        description: dto.description,
        location: dto.location,
        date: new Date(dto.date),
        image: dto.image,
      },
    });
  }

  async findAll(category?: EventCategory) {
    return this.prisma.event.findMany({
      where: {
        category,
      },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });
    console.log('Found event:', event);
    return event;
  }
}
