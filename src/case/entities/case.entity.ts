import { Organization } from '../../organization/entities/organization.entity';
import { User } from './../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Organization)
  @JoinColumn()
  organization: number;

  @ManyToOne(() => User)
  @JoinColumn()
  user: number;

  @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP()" })
  timestamp: Date;
}
