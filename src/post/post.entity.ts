import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  title: string;

  @Column({length: 300 })
  contents: string;

  @ManyToOne(type => User)
  @JoinColumn({
    name: "user",
    referencedColumnName: "id"
  })
  user: User;


  @Column({default: 0})
  viewCount: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
