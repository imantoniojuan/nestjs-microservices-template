import { Request } from 'express';
import { GoogleOauthService } from './google-oauth.service';
export declare class GoogleOauthController {
    private readonly googleOauthService;
    constructor(googleOauthService: GoogleOauthService);
    googleLogin(): any;
    googleLoginCallback(req: Request): unknown;
}
