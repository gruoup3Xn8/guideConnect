import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsBoolean, IsOptional, Min } from 'class-validator';
import { TransportType } from '../entities/transport.entity';

export class CreateTransportDto {
  @ApiProperty({ 
    example: 'Uzbekistan Railways', 
    description: 'Transport xizmati ko\'rsatuvchi kompaniya nomi' 
  })
  @IsString()
  provider_name: string;

  @ApiProperty({ 
    enum: TransportType, 
    example: TransportType.TRAIN,
    description: 'Transport turi (bus, car, train, taxi)' 
  })
  @IsEnum(TransportType)
  type: TransportType;

  @ApiProperty({ example: 150000, description: 'Xizmat narxi' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 45, description: 'Yo\'lovchi sig\'imi', required: false })
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @ApiProperty({ example: true, description: 'Hozirda mavjudmi?', default: true })
  @IsBoolean()
  @IsOptional()
  is_available?: boolean;
}