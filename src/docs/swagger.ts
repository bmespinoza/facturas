import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '3.0.0',
  info: {
    title: 'API invoices',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ['**/*.ts'],
};

export default swaggerJSDoc(swaggerOptions);
