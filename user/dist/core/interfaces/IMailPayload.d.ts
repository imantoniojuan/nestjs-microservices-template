export interface IMailPayload {
    template: keyof typeof EmailTemplates;
    payload: PaylaodType;
}
declare enum EmailTemplates {
    FORGOT_PASSWORD = "forgot-password"
}
interface PaylaodType {
    emails: string[];
    subject: string;
    data: any;
}
export {};
