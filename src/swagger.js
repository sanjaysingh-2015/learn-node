const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API documentation for Products & Sales"
    },
    servers: [
      { url: "http://localhost:3000" }
    ]
  },
  apis: [
    path.join(__dirname, "routes/*.js"),
    path.join(__dirname, "models/*.js")
  ]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
