import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}
  async create(createOrganizationDto: CreateOrganizationDto) {
    return await this.organizationRepository.save(createOrganizationDto);
  }

  async findAll() {
    return await this.organizationRepository.find();
  }

  async findOne(id: number): Promise<Organization> {
    return await this.organizationRepository.findOne(id);
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return await this.organizationRepository.update(id, updateOrganizationDto);
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }
}
