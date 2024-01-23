import swaggerJsdoc from "swagger-jsdoc";
const options = {
  apis: ["**/*.ts"],
  basePath: "http:localhost:5050/api",
  swaggerDefinition: {
    info: {
      description: "A Rest API Service for Pherify",
      swagger: "3.0",
      title: "Pherify ✌🏼✌🏼",
      version: "1.0.0",
    },
  },
};
let specs = swaggerJsdoc(options);

export default specs;
