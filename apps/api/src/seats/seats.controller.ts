import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatsBatchDto } from './dto/create-seat.dto';


@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
  create(@Body() dto: CreateSeatsBatchDto) {
    return this.seatsService.createBatch(dto);
  }

  @Get('by-event/:eventId')
  getSeats(@Param('eventId') eventId: string) {
    return this.seatsService.findByEvent(eventId);
  }
  
}
