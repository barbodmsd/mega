import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mega Clone API",
      version: "1.0.0",
      description: "API documentation for Mega-like file storage project",
    },
    servers: [
      {
        url: "http://localhost:7000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token to access protected routes",
        },
      },
    },
  },
  apis: ["../routes/*.js", "../controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export { swaggerSpec, swaggerUi };
