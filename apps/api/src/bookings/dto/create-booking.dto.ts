import { IsUUID, IsString } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    @IsUUID()
    seatId: string;
}
