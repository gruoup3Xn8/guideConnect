import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

interface FindAllOptions {
  page: number;
  limit: number;
  search?: string;
  sortOrder: 'ASC' | 'DESC';
}

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create({
      title: dto.title,
      description: dto.description,
      location: dto.location,
      date: new Date(dto.date),
      price: dto.price ?? 0,
      maxParticipants: dto.maxParticipants ?? 0,
    });
    return await this.eventRepository.save(event);
  }

  async findAll(options: FindAllOptions) {
    const { page, limit, search, sortOrder } = options;
    const skip = (page - 1) * limit;

    const qb = this.eventRepository.createQueryBuilder('event');

    if (search) {
      qb.where('event.title ILIKE :search OR event.location ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [data, total] = await qb
      .orderBy('event.date', sortOrder)
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findUpcoming(): Promise<Event[]> {
    return await this.eventRepository
      .createQueryBuilder('event')
      .where('event.date > :now', { now: new Date() })
      .orderBy('event.date', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository
      .createQueryBuilder('event')
      .where('event.id = :id', { id })
      .getOne();

    if (!event) throw new NotFoundException(`Event #${id} not found`);
    return event;
  }

  async update(id: number, dto: UpdateEventDto): Promise<Event> {
    const event = await this.findOne(id);
    if (dto.title) event.title = dto.title;
    if (dto.description) event.description = dto.description;
    if (dto.location) event.location = dto.location;
    if (dto.date) event.date = new Date(dto.date);
    if (dto.price !== undefined) event.price = dto.price;
    if (dto.maxParticipants !== undefined) event.maxParticipants = dto.maxParticipants;
    return await this.eventRepository.save(event);
  }

  async remove(id: number): Promise<void> {
    const event = await this.findOne(id);
    await this.eventRepository.remove(event);
  }
}