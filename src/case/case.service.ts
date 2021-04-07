import { Case } from './entities/case.entity';
import { Injectable } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Repository, UpdateResult } from 'typeorm';
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

  async findAllByUserId(userId: number): Promise<Case[]> {
    return await this.caseRepository.find({ where: { user: userId } });
  }

  async findOne(id: number): Promise<Case> {
    return await this.caseRepository.findOne(id);
  }

  async findOneByUserId(id: number, userId: number): Promise<Case> {
    return await this.caseRepository.findOne({
      where: { id: id, user: userId },
    });
  }

  async update(id: number, dto: UpdateCaseDto): Promise<UpdateResult> {
    return await this.caseRepository.update({ id }, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
