import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailDto } from './dto/mailData.dto';
import { RFQDto } from './dto/rfq.dto';
import { SendContactMailDto } from './dto/contactDto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(mailData: MailDto , templateName : string ,): Promise<any> {
     // Here you would implement the logic to send an email using a mail service
     const mailRes = await this.mailerService.sendMail({
      to: mailData.to,
      subject: mailData.subject,
      template: `./${templateName}`, // The template file name
      context: {
        username: mailData.context.username,
        password: mailData.context.pass,
        link: mailData.context.url,
   }
  });
    
    return { success: true };
  }

  async sendrfqMail(rfq: RFQDto , templateName : string ,): Promise<any> {

     // Here you would implement the logic to send an email using a mail service
     const mailRes = await this.mailerService.sendMail({
      to: rfq.email, // send to client
      subject: `RFQ Received: ${rfq.projectName}`,
      template: `./${templateName}`, // e.g. rfq-email-highlighted.hbs
      context: {
        // map all needed fields here
        name: rfq.name,
        email: rfq.email,
        company: rfq.company,
        contactNumber: rfq.contactNumber,
        address: rfq.address,
    
        projectName: rfq.projectName,
        rfqNumber: rfq.rfqNumber,
        rfqDate : rfq.rfqDate,
        quantity: rfq.quantity,
        serviceType: rfq.serviceType,
    
        partNumber: rfq.partNumber,
        boardSize: rfq.boardSize,
        boardThickness: rfq.boardThickness,
        tolerance: rfq.tolerance,
        boardFinish: rfq.boardFinish,
        solderMaskColor: rfq.solderMaskColor,
        silkscreenColor: rfq.silkscreenColor,
        minHoleSize: rfq.minHoleSize,
        subSpec: rfq.subSpec,
    
        testing: rfq.testing,
        dielectric: rfq.dielectric,
        impCtrl: rfq.impCtrl,
    
        description: rfq.description,
        uploadedFiles: rfq.uploadedFiles || [],
        newsletter: rfq.newsletter ? 'Yes' : 'No'
      },
    });
  }


  async sendContactUsMail(contactDto : SendContactMailDto , templateName : string ,): Promise<any> {

    const { to, subject, context } = contactDto;

    await this.mailerService.sendMail({
      to,
      subject,
      template: `./${templateName}`, // e.g., contact-confirmation
      context: {
        name: context.name,
        company: context.company,
        email: context.email,
        contactNumber: context.contactNumber,
        message: context.message,
        year: context.year || new Date().getFullYear(),
      },
    });

    return { success: true };
  }

}
