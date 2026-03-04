import { IsObject, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsObject()
  content?: Record<string, any>;
}
