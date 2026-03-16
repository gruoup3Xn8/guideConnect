
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocationDto } from './dto/create-loacation.dto';
import { UpdateLocationDto } from './dto/update-loacation.dto';
import { Location } from './entities/loacation.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private locationRepo: Repository<Location>,
  ) {}
async createLocation(createLocationDto: CreateLocationDto) {
  const { country_name } = createLocationDto;

  // 1. Avval bazada borligini tekshiramiz
  const exists = await this.locationRepo.findOne({ 
    where: { country_name } 
  });
  
  if (exists) {
    throw new BadRequestException("Bu davlat allaqachon qo'shilgan");
  }

  const newLocation = this.locationRepo.create(createLocationDto);

  const location = await this.locationRepo.save(newLocation)
  
  return {
    message: "Location successfully added",
    location
  };
}
  async findAll() {
    const loactions = await this.locationRepo.find();
    return loactions
  }


  // findAll() {
  //   return `This action returns all locations`;
  // }
// location.service.ts

async findOne(id: number) {
  const location = await this.locationRepo.findOne({
    where: { id },
    relations: { 
      hotel: true
    }
  });

  if (!location) {
    throw new NotFoundException(`ID si ${id} bo'lgan joylashuv topilmadi`);
  }

  return location;
}


async update(id: number, updateLocationDto: UpdateLocationDto) {
  const location = await this.locationRepo.findOne({ where: { id } });
  if (!location) {
    throw new NotFoundException(`ID si ${id} bo'lgan joylashuv topilmadi`);
  }

  await this.locationRepo.update(id, updateLocationDto);

  return this.findOne(id); 
}


async remove(id: number) {
  const location = await this.locationRepo.findOne({ where: { id } });
  
  if (!location) {
    throw new NotFoundException(`ID si ${id} bo'lgan joylashuv topilmadi`);
  }

  await this.locationRepo.remove(location);

  return {
    message: "Location successfully deleted",
    deletedId: id
  };
}
}
