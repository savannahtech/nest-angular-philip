import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
 
export class UpdatePostDto {
  @ApiPropertyOptional({
    description: 'The userId of the Post to be Updated (Optional)',
    type: String
  })
  @IsNumber()
  @IsOptional()
  userId: number;
 
  @ApiPropertyOptional({
    description: 'The New Body of the Post to be Updated (Optional)',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  body: string;
 
  @ApiPropertyOptional({
    description: 'The New Title of the Post to be Updated (Optional)',
    type: String
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;
}