import csv from 'csv-parser';
import fs from 'fs';
import moment from 'moment';
import { csvRow } from '../interfaces/services/listClients';
import { dataSummary } from '../interfaces/services/summary';

export const summary = async (file: Express.Multer.File, businessId: string, date: string) => {
  const data: dataSummary = {
    7: {
      income: 0,
      expenses: 0,
    },
    14: {
      income: 0,
      expenses: 0,
    },
    30: {
      income: 0,
      expenses: 0,
    },
  };

  if (!moment(date, 'YYYY-MM-DD', true).isValid()) {
    throw new Error('Date format is invalid, please use YYYY-MM-DD format!');
  }
  const startDate = moment(date, 'YYYY-MM-DD');
  return new Promise((resolve) => {
    fs.createReadStream(file.path)
      .pipe(csv())
      .on('data', (row: csvRow) => {
        const currentDate = moment(row.paymentDate, 'YYYY-MM-DD');
        if (row.issuerId === businessId) {
          if (currentDate.isAfter(startDate) && currentDate.diff(startDate, 'days') <= 7) {
            data[7].income += Number(row.amount);
          }
          if (currentDate.isAfter(startDate) && currentDate.diff(startDate, 'days') <= 14) {
            data[14].income += Number(row.amount);
          }
          if (currentDate.isAfter(startDate) && currentDate.diff(startDate, 'days') <= 30) {
            data[30].income += Number(row.amount);
          }
        } else if (row.receiverId === businessId) {
          if (currentDate.isAfter(startDate) && currentDate.diff(startDate, 'days') < 7) {
            data[7].expenses += Number(row.amount);
          }
          if (currentDate.isAfter(startDate) && currentDate.diff(startDate, 'days') <= 14) {
            data[14].expenses += Number(row.amount);
          }
          if (currentDate.isAfter(startDate) && currentDate.diff(startDate, 'days') <= 30) {
            data[30].expenses += Number(row.amount);
          }
        }
      })
      .on('end', () => {
        resolve(data);
        fs.unlinkSync(file.path);
      });
  });
};
