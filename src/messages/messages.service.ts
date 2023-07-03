import { Injectable } from '@nestjs/common';
import MessagesRepository from './messages.repository';
import MessagesCreateDto from './dto/messages.create.dto';

@Injectable()
export class MessagesService {
  constructor(public messagesRepository: MessagesRepository) {}

  findAll() {
    return this.messagesRepository.findAll();
  }

  findById(id: string) {
    return this.messagesRepository.findById(parseInt(id));
  }

  create(messageDto: MessagesCreateDto) {
    return this.messagesRepository.create(messageDto.content);
  }

  edit(id: string, body: MessagesCreateDto) {
    return this.messagesRepository.edit(parseInt(id), body.content);
  }
}
