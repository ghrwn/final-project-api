const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Final Project API",
    description: "API for products, orders, users, and reviews"
  },
  host: "localhost:8080",
  schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./server.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);