import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt')) 
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get('my')
  findMy(@Request() req: any) {
    return this.bookingsService.findMyBookings(req.user.id);
  }
  @Post()
  create(@Request() req: any, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(req.user.id, dto);
  }
  
  
}
