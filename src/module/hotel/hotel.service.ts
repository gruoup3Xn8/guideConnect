import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel) private hotelRepo: Repository<Hotel>,
  ) {}

  async create(createHotelDto: CreateHotelDto) {
    const { hotel_name } = createHotelDto;

    // Avval bazada borligini tekshiramiz
    const exists = await this.hotelRepo.findOne({ 
      where: { hotel_name } 
    });
    
    if (exists) {
      throw new BadRequestException("Bu hotel allaqachon qo'shilgan");
    }

    const newHotel = this.hotelRepo.create(createHotelDto);
    const hotel = await this.hotelRepo.save(newHotel);
    
    return {
      message: "Hotel successfully added",
      hotel
    };
  }

  async findAll() {
    const hotels = await this.hotelRepo.find({
      relations: ['auth', 'location']
    });
    return hotels;
  }

  async findOne(id: number) {
    const hotel = await this.hotelRepo.findOne({
      where: { id },
      relations: ['auth', 'location']
    });

    if (!hotel) {
      throw new NotFoundException(`ID si ${id} bo'lgan hotel topilmadi`);
    }

    return hotel;
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    const hotel = await this.hotelRepo.findOne({ where: { id } });
    if (!hotel) {
      throw new NotFoundException(`ID si ${id} bo'lgan hotel topilmadi`);
    }

    await this.hotelRepo.update(id, updateHotelDto);

    return this.findOne(id); 
  }

  async remove(id: number) {
    const hotel = await this.hotelRepo.findOne({ where: { id } });
    
    if (!hotel) {
      throw new NotFoundException(`ID si ${id} bo'lgan hotel topilmadi`);
    }

    await this.hotelRepo.remove(hotel);

    return {
      message: "Hotel successfully deleted",
      deletedId: id
    };
  }

  async deactivate(id: number) {
    const hotel = await this.hotelRepo.findOne({ where: { id } });
    if (!hotel) {
      throw new NotFoundException(`ID si ${id} bo'lgan hotel topilmadi`);
    }

    hotel.isActive = false;
    await this.hotelRepo.save(hotel);
    
    return hotel;
  }

  async activate(id: number) {
    const hotel = await this.hotelRepo.findOne({ where: { id } });
    if (!hotel) {
      throw new NotFoundException(`ID si ${id} bo'lgan hotel topilmadi`);
    }

    hotel.isActive = true;
    await this.hotelRepo.save(hotel);
    
    return hotel;
  }
}
