/**
 * @swagger
 *
 * /api/business/summary:
 *  post:
 *      tags:
 *      - business
 *      summary: get a summary of the income and expenses for a certain company
 *      operationId: summary
 *      requestBody:
 *          description: "Object with date, file and bussinesId to get the summary"
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          businessId:
 *                              type: string
 *                          date:
 *                              type: string
 *                          file:
 *                              type: file
 *          required: true
 *      responses:
 *          200:
 *              description: "returned the summary"
 *          400:
 *              description: "some parameters are missing or date format is invalid. Follow this format: YYYY-MM-DD"
 */
