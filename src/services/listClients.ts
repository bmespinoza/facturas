import csv from 'csv-parser';
import fs from 'fs';
import moment from 'moment';
import { csvRow, dataList, dataValue } from '../interfaces/services/listClients';

export const listClients = async (
  file: Express.Multer.File,
  businessId: string,
  startDate: string,
  endDate: string
) => {
  const data: dataList = {};
  if (!(moment(startDate, 'YYYY-MM-DD', true).isValid() || moment(endDate, 'YYYY-MM-DD', true).isValid())) {
    throw new Error('Date format is invalid, please use YYYY-MM-DD format!');
  }
  const initialDate = moment(startDate, 'YYYY-MM-DD');
  const lastDate = moment(endDate, 'YYYY-MM-DD');

  const results: dataList = await new Promise((resolve) => {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row: csvRow) => {
        const currentDate = moment(row.issueDate, 'YYYY-MM-DD');

        if (row.issuerId === businessId) {
          if (currentDate.isSameOrAfter(initialDate) && currentDate.isSameOrBefore(lastDate)) {
            if (!(row.receiverId in data)) {
              data[row.receiverId] = { amount: 0, numberOfInvoice: 0, avgSalePerInvoice: 0 };
            }
            data[row.receiverId].amount += Number(row.amount);
            data[row.receiverId].numberOfInvoice += 1;
          }
        }
      })
      .on('end', () => {
        resolve(data);
        fs.unlinkSync(file.path);
      });
  });
  Object.entries(results).forEach(
    (r: (string | dataValue)[]) =>
      ((r[1] as dataValue).avgSalePerInvoice = (r[1] as dataValue).amount / (r[1] as dataValue).numberOfInvoice)
  );
  const clients = Object.entries(results)
    .sort((a: (string | dataValue)[], b: (string | dataValue)[]) => {
      return (b[1] as dataValue).amount - (a[1] as dataValue).amount;
    })
    .map(([key, value]) => ({ [key]: value }));

  if (clients.length > 10) {
    return clients.slice(0, 10);
  } else {
    return clients;
  }
};
