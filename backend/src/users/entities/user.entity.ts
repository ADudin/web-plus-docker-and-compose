import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/utils/base.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Offer } from 'src/offers/entities/offer.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'Имя пользователя должно содержать не менее 2 символов',
  })
  @MaxLength(30, {
    message: 'Имя пользователя должно содержать не более 30 символов',
  })
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @IsString()
  @IsOptional()
  @MinLength(2, {
    message: 'Поле должно содержать не менее 2 символов',
  })
  @MaxLength(200, {
    message: 'Поле должно содержать не более 200 символов',
  })
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  @IsOptional()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ select: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, {
    message: 'Пароль должен содержать не менее 2 символов',
  })
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];

  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];
}
