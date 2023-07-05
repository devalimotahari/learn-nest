import { IsString } from 'class-validator';

class MessagesCreateDto {
  @IsString({ message: 'لطفا متن را فقط به صورت رشته وارد نمایید.' })
  content: string;
}

export default MessagesCreateDto;
