// Create a service for PDF generation (pdf.service.ts)
import { Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { CLIENT_RENEG_LIMIT } from 'tls';

const PDFDocument = require('pdfkit');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generatePdf(templatName, data): Promise<Buffer> {
    const invoiceData = {
      title: 'Invoice',
      invoiceNumber: 'INV-2025-001',
      date: new Date().toLocaleDateString(),
      company: {
        name: 'Your Company',
        address: '123 Business St, City, Country',
        email: 'contact@yourcompany.com',
      },
      customer: {
        name: 'Customer Name',
        address: '456 Customer Ave, Town, Country',
        email: 'customer@example.com',
      },
      items: [
        {
          name: 'Product 1',
          description: 'Description of product 1',
          quantity: 2,
          price: 50,
          total: 100,
        },
        {
          name: 'Product 2',
          description: 'Description of product 2',
          quantity: 1,
          price: 75,
          total: 75,
        },
      ],
      subtotal: 175,
      taxRate: 10,
      taxAmount: 17.5,
      total: 192.5,
    };

    // 1. Read the template
    const templatePath = path.join(
      process.cwd(),
      'src',
      'pdfs',
      'templates',
      // 'email',
      `${templatName}.hbs`,
    );
    const templateContent = fs.readFileSync(templatePath, 'utf8');

    console.log('templatePath', templatePath);
    console.log('templateContent', templateContent);

    // 2. Compile the template with Handlebars
    const template = handlebars.compile(templateContent);
    const html = template(data);

    // 3. Generate PDF using Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF buffer
    const pdfData = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
      displayHeaderFooter: true,
      footerTemplate: `
    <div style="border-top: 1px solid #ccc; padding-top: 10px; text-align: right;">
      <span class="pageNumber"></span>/<span class="totalPages"></span>
    </div>
  `,
    });

    await browser.close();

    // 4. Save the PDF to the reports directory
    const reportsDir = path.join(process.cwd(), 'src', 'pdfs', 'reports');
    const timestamp = Date.now();
    const filePath = path.join(reportsDir, `invoice-${timestamp}.pdf`);
    fs.writeFileSync(filePath, pdfData);

    console.log(`PDF saved to: ${filePath}`);

    // Convert to Buffer before returning
    return Buffer.from(pdfData);
  }
}
