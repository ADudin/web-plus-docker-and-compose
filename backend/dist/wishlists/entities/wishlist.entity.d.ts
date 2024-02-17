import { TUser } from 'src/users/types/user.type';
import { BaseEntity } from 'src/utils/base.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Wishlist extends BaseEntity {
    name: string;
    description: string;
    image: string;
    items: Wish[];
    owner: TUser;
}
