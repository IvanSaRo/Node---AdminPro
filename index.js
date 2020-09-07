require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");

// Creo el server de express
const app = express();

// Configuro CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// BD
dbConnection();

app.use("/api/users", require("./routes/users"));
app.use("/api/hospitals", require("./routes/hospitals"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/search", require("./routes/searchs"));

app.listen(process.env.PORT, () => {
  console.log("Corriendo en puerto " + process.env.PORT);
});
