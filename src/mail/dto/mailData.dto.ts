export class MailDto {
    to : string;
    subject : string;
    context : {
        username : string;
        pass: string;
        url: string;
    };
    attachments? : any[];
}