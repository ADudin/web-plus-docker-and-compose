import { TUser } from 'src/users/types/user.type';
import { BaseEntity } from 'src/utils/base.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class Offer extends BaseEntity {
    amount: number;
    hidden: boolean;
    item: Wish;
    user: TUser;
}
