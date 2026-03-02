import { IsOptional, IsString, IsBoolean, IsObject } from 'class-validator';

export class UpdatePortfolioDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsObject()
  content?: Record<string, any>;

  @IsOptional()
  @IsString()
  theme?: string;
  
  @IsOptional()
  @IsObject()
  themeConfig?: {
    colors?: {
      primary?: string;
      background?: string;
      text?: string;
    };
    font?: string;
    layout?: string;
  };
}
