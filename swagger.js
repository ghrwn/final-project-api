const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Final Project API",
    description: "Products and Orders API"
  },
  host: "localhost:8080",
  schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);