import { Injectable } from '@nestjs/common';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@Injectable()
export class GuideService {
  create(createGuideDto: CreateGuideDto) {
    return 'This action adds a new guide';
  }

  findAll() {
    return `This action returns all guide`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guide`;
  }

  searchId(id: string) {
    return `This action search guide with id ${id}`;
  }

  checkGuide(id: string) {
    return `This action checks guide ${id}`;
  }

  update(id: number, updateGuideDto: UpdateGuideDto) {
    return `This action updates a #${id} guide`;
  }

  remove(id: number) {
    return `This action removes a #${id} guide`;
  }
    // deactivate qilish
  deactivate(id: number) {
    const guide = this.guideService.find(g => g.id === id);
    if (!guide) return { message: 'Not found' };

    guide.isActive = false;
    return guide;
  }

  // activate qilish
  activate(id: number) {
    const guide = this.guideService.find(g => g.id === id);
    if (!guide) return { message: 'Not found' };

    guide.isActive = true;
    return guide;
  }
}