const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Text API",
      version: "1.0.0",
      description: "API documentation of the text apis",
      contact: {
        name: "API Support",
        email: "monjurul.hoque.shuvo@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API routes
};

export default swaggerOptions;
