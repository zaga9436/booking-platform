import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { SeatsModule } from './seats/seats.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [PrismaModule, AuthModule, EventsModule, SeatsModule, BookingsModule, PaymentsModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
