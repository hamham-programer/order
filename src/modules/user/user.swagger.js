/**
 * @swagger
 * tags:
 *  name: User
 *  description: User module and Routes
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateUserProfile:
 *              type: object
 *              required:
 *                  -   fullName
 *                  -   personnelCode
 *                  -   workLocation
 *              properties:
 *                  fullName:
 *                      type: string
 *                  personnelCode:
 *                      type: string
 *                  workLocation:
 *                      type: string
 */


/**
 * @swagger
 * /user/whoami:
 *  get:
 *      summary: get user-profile 
 *      tags:
 *          -   User
 *      responses:
 *          200:
 *              description: success
 */

/**
@swagger
* /user/profile:
*  put:
*      summary: Update user profile
*      tags:
*          - User
*      security:
*          - CookieAuth: []
*      requestBody:
*          content:
*              application/x-www-form-urlencoded:
*                  schema:
*                      $ref: '#/components/schemas/UpdateUserProfile'
*              application/json:
*                  schema:
*                      $ref: '#/components/schemas/UpdateUserProfile'
*      responses:
*          200:
*              description: Profile updated successfully
*              content:
*                  application/json:
*                      schema:
*                          type: object
*                          properties:
*                              message:
*                                  type: string
*                                  example: "Profile updated successfully"
*                              user:
*                                  type: object
*                                  properties:
*                                      _id:
*                                          type: string
*                                          example: "66bc630755ca2443d0fa14a4"
*                                      fullName:
*                                          type: string
*                                          example: "John Doe"
*                                      mobile:
*                                          type: string
*                                          example: "09100639648"
*                                      personnelCode:
*                                          type: string
*                                          example: "123456"
*                                      workLocation:
*                                          type: string
*                                          example: "New York"
*                                      role:
*                                          type: string
*                                          example: "ADMIN"
*                                      createdAt:
*                                          type: string
*                                          example: "2024-08-14T07:55:51.025Z"
*          400:
*              description: Bad request
*          401:
*              description: Unauthorized
*          404:
*              description: User not found
*/