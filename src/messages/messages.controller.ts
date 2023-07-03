import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import MessagesCreateDto from './dto/messages.create.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messageService: MessagesService) {}

  @Get()
  list() {
    return this.messageService.findAll();
  }

  @Get('/:id')
  async getById(@Param('id') id) {
    const message = await this.messageService.findById(id);
    if (!message)
      throw new NotFoundException('با این آیدی چیزی ندارم خداوکیلی!!');

    return message;
  }

  @Post()
  create(@Body() body: MessagesCreateDto) {
    return this.messageService.create(body);
  }

  @Put('/:id')
  edit(@Param('id') id, @Body() body: MessagesCreateDto) {
    return this.messageService.edit(id, body);
  }
}
