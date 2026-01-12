import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateEventDto {
    @IsString()
    name: string;
    
    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    date: string;

    @IsString()
    location: string;

}
