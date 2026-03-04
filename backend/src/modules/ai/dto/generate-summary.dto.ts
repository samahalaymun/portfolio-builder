import { IsArray, IsOptional, IsString } from 'class-validator';

export class GenerateSummaryDto {
  @IsOptional()
  @IsString()
  userText?: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsArray()
  skills?: string[];
}
