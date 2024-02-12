import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'some text', description: 'Content of the message' })
  @IsString()
  @IsNotEmpty()
  message: string;
}
