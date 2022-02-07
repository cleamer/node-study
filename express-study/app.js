const express = require("express");
const app = express();

app.set("port", process.env.PORT || 8080);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(app.get("port"), () => console.log(`Server is running on ${app.get("port")}`));
