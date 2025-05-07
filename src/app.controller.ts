import { Controller, Get, Body, Query, Res, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('generate-pdf')
  // async generatePdf(): Promise<string> {
  //   await this.appService.generatePdf();
  //   return 'PDF generation started! Check the console for status.';
  // }

  @Post('pdf-ops')
  async pdfOps(
    @Body() data: any,
    @Query('template') templateName: string,
    // @Query('action') action: 'view' | 'download' = 'download',
    @Res() res: Response,
  ) {
    try {
      // Generate PDF from template and data
      const pdfBuffer = await this.appService.generatePdf(templateName, data);

      // Send as downloadable file
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=sample-invoice.pdf',
      });

      res.send(pdfBuffer);
    } catch (error) {
      console.log('Error generating pdf : ', error);
      throw new Error('Error generating PDF');
    }
  }

  @Get('preview-pdf')
  async previewInvoice(@Res() res: Response) {
    // Using the same data as above
    const invoiceData = {
      // ... same data as in the sample method
      title: 'Invoice Preview',
      invoiceNumber: 'INV-2025-001',
      // ... rest of the data
    };

    const pdfBuffer = await this.appService.generatePdf('invoice', invoiceData);

    // Send for viewing in browser
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline',
    });

    res.send(pdfBuffer);
  }
}
