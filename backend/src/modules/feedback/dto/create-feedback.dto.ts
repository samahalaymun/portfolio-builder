import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateFeedbackDto {
  @IsInt()
  @Min(0)
  @Max(10)
  score: number;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  comment?: string;
}
