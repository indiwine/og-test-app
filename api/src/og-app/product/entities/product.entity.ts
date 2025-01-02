import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory } from '../../product-category/entities/product-category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ type: 'float', nullable: false, default: 0 })
  price: number;

  @OneToOne(() => ProductCategory)
  @JoinColumn()
  category: ProductCategory;
}
