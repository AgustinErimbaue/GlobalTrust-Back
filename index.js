const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const PORT = process.env.PORT

app.use("/user", require("./routes/user"));
app.use("/account", require("./routes/account"));
app.use("/card", require("./routes/card"));
app.use("/transaction", require("./routes/transaction"));
app.use("/loan", require("./routes/loan"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
