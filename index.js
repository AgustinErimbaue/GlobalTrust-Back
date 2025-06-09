const express = require("express");
const app = express();
app.use(express.json());
const PORT = 8080;

app.use("/user", require("./routes/user"));
app.use("/account", require("./routes/account"));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
