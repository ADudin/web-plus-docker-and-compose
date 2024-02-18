import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { TUser } from 'src/users/types/user.type';
import { BaseEntity } from 'src/utils/base.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Wishlist extends BaseEntity {
  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(1, {
    message: 'Название списка подарков должно содержать не менее 1 символа',
  })
  @MaxLength(250, {
    message: 'Название списка подарков должно содержать не более 250 символов',
  })
  name: string;

  @Column({ default: 'Пока нет описания' })
  @IsString()
  @MinLength(1, {
    message: 'Описание списка подарков должно содержать не менее 1 символа',
  })
  @MaxLength(1500, {
    message: 'Описание списка подарков должно содержать не более 1500 символов',
  })
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  @JoinTable()
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: TUser;
}
