import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/createOffer.dto';
import { IUserRequest } from 'src/users/types/user.type';
import { Offer } from './entities/offer.entity';
export declare class OffersController {
    private readonly offersService;
    constructor(offersService: OffersService);
    create(createOfferDto: CreateOfferDto, req: IUserRequest): Promise<Record<string, never>>;
    getNotHiddenOffers(): Promise<Offer[]>;
    getOfferById(offerId: number): Promise<Offer>;
}
