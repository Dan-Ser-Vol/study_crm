import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageResponseDto {
  @ApiProperty({ example: 'some text', description: 'Content of the message' })
  @IsString()
  @IsNotEmpty()
  content: string;


  @ApiProperty({ example: 'manager', description: 'the owner of the message' })
  @IsString()
  manager: string;
}
