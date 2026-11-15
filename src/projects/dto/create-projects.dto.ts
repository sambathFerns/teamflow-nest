import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  name: string;
}

export class UpdateProjectDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @MinLength(1)
  name: string;
}
