import { ClientProxy } from '@nestjs/microservices';
import { UserRepository } from 'src/database/repository/user.repository';
import { IGoogleUserInfo } from './interfaces/IGoogleUserInfo';
export declare class GoogleOauthService {
    private readonly userRepository;
    private tokenClient;
    constructor(userRepository: UserRepository, tokenClient: ClientProxy);
    loginUser(userInfo: IGoogleUserInfo): unknown;
}
