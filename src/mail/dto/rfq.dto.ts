export class RFQDto {
    name: string;
    email: string;
    company: string;
    contactNumber: string;
    address: string;
  
    projectName: string;
    rfqNumber : string;
    rfqDate : string;
    quantity: string;
    serviceType: string[]; // e.g. ["Fab", "Parts"]
  
    partNumber?: string;
    boardSize?: string;
    boardThickness?: string;
    tolerance?: string;
    boardFinish?: string;
    solderMaskColor?: string;
    silkscreenColor?: string;
    minHoleSize?: string;
    subSpec?: string;
  
    testing?: boolean;
    dielectric?: boolean;
    impCtrl?: boolean;
  
    description?: string;
    uploadedFiles?: string[];
  
    newsletter?: boolean;
  }
  