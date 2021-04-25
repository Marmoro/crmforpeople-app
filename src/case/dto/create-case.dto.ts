import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';
import { CaseType } from '../entities/case.entity';

export class CreateCaseDto {
  @ApiProperty({ default: 'long text', description: 'content of the case' })
  content: string;

  @ApiProperty({ default: CaseType.INQUIRY })
  caseType: CaseType;

  @IsDefined()
  @ApiProperty()
  organization: number;

  user: number;
}
