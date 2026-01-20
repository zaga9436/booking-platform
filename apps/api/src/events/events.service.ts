import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEventDto){
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

  async findAll() {
    return this.prisma.event.findMany();
  
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
    });
  }
}
