import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'some text', description: 'Content of the message' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
