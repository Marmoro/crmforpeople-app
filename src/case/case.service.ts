import { Case } from './entities/case.entity';
import { Injectable } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Case)
    private caseRepository: Repository<Case>,
  ) {}

  async create(createCaseDto: CreateCaseDto): Promise<Case> {
    return await this.caseRepository.save(createCaseDto);
  }

  async findAll(): Promise<Case[]> {
    return await this.caseRepository.find();
  }

  async findOne(id: number): Promise<Case> {
    return await this.caseRepository.findOne(id);
  }

  update(id: number, updateCaseDto: UpdateCaseDto) {
    return `This action updates a #${id} case`;
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
