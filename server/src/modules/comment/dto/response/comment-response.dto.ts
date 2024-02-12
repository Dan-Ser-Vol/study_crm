import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

export class CommentResponseDto {
  @ApiProperty({ example: 'comment id' })
  _id: ObjectId;

  @ApiProperty({ example: 'some text', description: 'Content of the message' })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ example: 'manager', description: 'the owner of the message' })
  @IsOptional()
  manager?: { name: string };

  @ApiProperty({ example: 'Date', description: 'Date of comment created ' })
  @IsOptional()
  created_at?: Date;
}
