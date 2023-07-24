import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'This is the body of the Post',
    type: String
  })
  @IsString({ each: true })
  @IsNotEmpty()
  body: string;
  
  @ApiProperty({
    description: 'This is the title of the Post',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  title: string;
  
  @ApiPropertyOptional({
    description: 'This is UserId of the Post Author',
    type: Number
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  userId: number;
}