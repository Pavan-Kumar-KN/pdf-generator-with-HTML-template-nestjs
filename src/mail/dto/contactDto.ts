export class SendContactMailDto {
    to: string;
    subject: string;
    template: string;
    context: {
      name: string;
      company: string;
      email: string;
      contactNumber: string;
      message: string;
      year?: number;
    };
  }
  