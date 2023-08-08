const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/getdata", async (req, res) => {
  try {
    const { url, token, key, session } = req.body;
    console.log(req.body);
    const headers = {
      "Auth-token": token,
      "Api-key": key,
      "Content-Type": "application/json",
    };

    const sessiondata = {
      session_id: session,
    };
    const response = await axios.post(url, sessiondata, {
      headers,
    });
    console.log(response.data, ">>>>>>>>>>>>>>>>>>>>");
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: "Failed to fetch data from the external API",
    });
  }
});

app.listen(PORT, () => {
  console.log("App Is Running On " + PORT);
});
