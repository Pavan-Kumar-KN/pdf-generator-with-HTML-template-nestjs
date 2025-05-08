import { Body, Controller, Post, Query } from "@nestjs/common";
import { MailDto } from "./dto/mailData.dto";
import { MailService } from "./mail.service";
import { RFQDto } from "./dto/rfq.dto";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService : MailService) {}

    @Post('send')
    async sendMail(@Body() data: MailDto , @Query('template') templateName: string) {
        return await this.mailService.sendMail(data , templateName);
    }

    @Post('sendrfq')
    async sendrfqMail(@Body() rfq: RFQDto , @Query('template') templateName: string) {
        return await this.mailService.sendrfqMail(rfq , templateName);
    }

    @Post('sendcontact')
    async sendContactMail(@Body() contact: any , @Query('template') templateName: string) {
        return await this.mailService.sendContactUsMail(contact , templateName);
    }


}