import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transport } from './entities/transport.entity';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { Auth } from '../auth/entities/auth.entity';

@Injectable()
export class TransportService {
  constructor(
    @InjectRepository(Transport)
    private readonly transportRepository: Repository<Transport>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  //  CREATE
  async create(createTransportDto: CreateTransportDto, userId: number) {
    
    const user = await this.authRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`ID: ${userId} bo'lgan foydalanuvchi topilmadi!`);
    }

    const transport = this.transportRepository.create({
      ...createTransportDto,
      auth: user,
    });

    return await this.transportRepository.save(transport);
  }

  // FIND  ALL
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.transportRepository.findAndCount({
      where: { is_available: true }, 
      relations: ['auth'],
      take: limit,
      skip: skip,
      order: { created_At: 'DESC' }, 
    });

    return {
      data,
      meta: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // FIND ONE
  async findOne(id: number) {
    const transport = await this.transportRepository.findOne({
      where: { id },
      relations: ['auth'],
    });

    if (!transport) {
      throw new NotFoundException(`ID: ${id} bo'lgan transport topilmadi!`);
    }
    return transport;
  }

  // UPDATE
  async update(id: number, updateTransportDto: UpdateTransportDto) {
    const transport = await this.findOne(id); 

   
    const updated = Object.assign(transport, updateTransportDto);
    return await this.transportRepository.save(updated);
  }

  //SOFT DELETE
  async remove(id: number) {
    const transport = await this.findOne(id);
    
   
    transport.is_available = false;
    await this.transportRepository.save(transport);
    
    return { message: `ID: ${id} bo'lgan transport muvaffaqiyatli o'chirildi (soft delete).` };
  }
}
