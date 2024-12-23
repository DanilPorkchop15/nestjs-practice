import { IsNotEmpty, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreateFileDto {
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsOptional()
  type: string;

  @IsNotEmpty()
  userId: string;
}
