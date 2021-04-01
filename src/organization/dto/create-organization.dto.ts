import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({ default: 'long text', description: 'content of the case' })
  companyName: string;

  @ApiProperty({ default: '' })
  companyLogo: string;

  @ApiProperty({ type: 'boolean' })
  active: boolean;
}
