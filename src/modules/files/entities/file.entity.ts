import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  type: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', update: false })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @BeforeInsert()
  private setCreationDate() {
    this.created_at = new Date();
  }

  @BeforeUpdate()
  private setUpdateDate() {
    this.updated_at = new Date();
  }
}
