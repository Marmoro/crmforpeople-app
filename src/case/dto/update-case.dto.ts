import { OmitType } from '@nestjs/swagger';
import { CreateCaseDto } from './create-case.dto';

export class UpdateCaseDto extends OmitType(CreateCaseDto, ['caseType'] as const) {

}