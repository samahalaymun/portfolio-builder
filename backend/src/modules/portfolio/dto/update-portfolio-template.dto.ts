import { IsNotEmpty, IsString } from "class-validator";

export class UpdatePortfolioTemplateDto {
  @IsString()
  @IsNotEmpty()
  templateId: string;
}