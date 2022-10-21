export interface IGoogleUserInfo {
    id: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    emails: [
        {
            value: string;
            verified: true;
        }
    ];
    photos: [{
        value: string;
    }];
    provider: string | 'google';
}
