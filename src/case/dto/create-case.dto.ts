import { ApiProperty } from '@nestjs/swagger';
import { CaseType } from '../entities/case.entity';

export class CreateCaseDto {
  @ApiProperty({ default: 'long text', description: 'content of the case' })
  content: string;

  @ApiProperty({ default: CaseType.INQUIRY })
  caseType: CaseType;

  @ApiProperty()
  organization: number;

  user: number;
}
