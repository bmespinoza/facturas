/**
 * @swagger
 *
 * /api/business/listClients:
 *  post:
 *      tags:
 *      - business
 *      summary: get a list of the ten clients with the highest sale amount for a certain company
 *      operationId: list clients
 *      requestBody:
 *          description: "Object with dates, file and bussinesId to get the list"
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          businessId:
 *                              type: string
 *                          startDate:
 *                              type: string
 *                          endDate:
 *                              type: string
 *                          file:
 *                              type: file
 *          required: true
 *      responses:
 *          200:
 *              description: "returned the list of clients"
 */
