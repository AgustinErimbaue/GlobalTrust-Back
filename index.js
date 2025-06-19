const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use("/users", require("./routes/user"));
app.use("/accounts", require("./routes/account"));
app.use("/cards", require("./routes/card"));
app.use("/transactions", require("./routes/transaction"));
app.use("/loans", require("./routes/loan"));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
