import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateSeatsBatchDto {
    @IsUUID()
    eventId: string;

    @IsInt()
    @Min(1)
    rows: number;

    @IsInt()
    @Min(1)
    seatsPerRow: number;

    @IsInt()
    @Min(0)
    price: number;
}
