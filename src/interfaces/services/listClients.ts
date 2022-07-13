export interface csvRow {
  invoiceId: string;
  issuerId: string;
  receiverId: string;
  amount: string;
  issueDate: string;
  paymentDate: string;
}

export interface dataList {
  [receiverId: string]: dataValue;
}

export interface dataValue {
  amount: number;
  numberOfInvoice: number;
  avgSalePerInvoice: number;
}
