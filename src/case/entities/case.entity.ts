import { User } from './../../user/entities/user.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Optional } from '@nestjs/common';

export enum CaseStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  RESOLVED = 'RESOLVED',
  CANCELED = 'CANCELED',
}

export enum CaseType {
  INQUIRY = 'INQUIRY',
  COMPLAIN = 'COMPLAIN',
  COMPLIMENT = 'COMPLIMENT',
}

@Entity()
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: CaseType,
    default: CaseType.INQUIRY,
  })
  caseType: CaseType;

  @Column({
    type: 'enum',
    enum: CaseStatus,
    default: CaseStatus.IN_PROGRESS,
  })
  caseStatus: CaseStatus;

  @Column()
  content: string;

  @OneToOne(() => Organization, (organization) => organization.id)
  @JoinColumn()
  organization: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
