import express from "express";
import sequelize from "./database/connection";
import { errorHandler } from "./middleware/errorHandler";
import textRoutes from "./routes/textRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerOptions from "./utils/swagger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize
  .sync()
  .then(() => {
    console.log("Database synced!");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", textRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
