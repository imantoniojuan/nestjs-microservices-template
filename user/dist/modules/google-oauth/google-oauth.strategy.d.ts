declare const GoogleOAuthStrategy_base: any;
export declare class GoogleOAuthStrategy extends GoogleOAuthStrategy_base {
    constructor();
    validate: (_accessToken: string, _refreshToken: string, profile: any) => unknown;
}
export {};
