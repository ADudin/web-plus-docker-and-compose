import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/createOffer.dto';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
export declare class OffersService {
    private readonly offersRepository;
    private readonly wishRepository;
    constructor(offersRepository: Repository<Offer>, wishRepository: Repository<Wish>);
    create(createOfferDto: CreateOfferDto, user: User): Promise<Record<string, never>>;
    findNotHiddenOffers(): Promise<Offer[]>;
    findOne(offerId: number): Promise<Offer>;
}
