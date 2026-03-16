import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query, 
  ParseIntPipe 
} from '@nestjs/common';
import { TransportService } from './transport.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('Transport') 
@Controller('transport')
export class TransportController {
  constructor(private readonly transportService: TransportService) {}

  @Post('create/:userId')
  @ApiOperation({ summary: 'Yangi transport qo\'shish' })
  @ApiResponse({ status: 201, description: 'Transport muvaffaqiyatli yaratildi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createTransportDto: CreateTransportDto
  ) {
    return this.transportService.create(createTransportDto, userId);
  }

  @Get('all')
  @ApiOperation({ summary: 'Barcha transportlarni pagination bilan olish' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10
  ) {
    return this.transportService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo\'yicha bitta transportni ko\'rish' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transportService.findOne(id);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Transport ma\'lumotlarini yangilash' })
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTransportDto: UpdateTransportDto
  ) {
    return this.transportService.update(id, updateTransportDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Transportni soft-delete qilish' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.transportService.remove(id);
  }
}
