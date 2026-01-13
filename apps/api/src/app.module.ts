import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { SeatsModule } from './seats/seats.module';

@Module({
  imports: [PrismaModule, AuthModule, EventsModule, SeatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
