const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();
const axios = require("axios");
const { Config, Client, Platforms } = require('@adyen/api-library');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;
const config = new Config({
  apiKey: process.env.ADYEN_API_KEY,
  environment: process.env.ADYEN_ENV,
  username: process.env.ADYEN_USER,
  password: process.env.ADYEN_PASSWORD,
  applicationName: process.env.ADYEN_APPLICATION_NAME
});
const client = new Client({
  config
});
const platforms = new Platforms(client);

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cors());

app.get('/', (req, res, next) => {
  res.json({success: true});
})

app.post('/createAccount', (req, res, next) => {
  platforms.Account.createAccountHolder({
    accountHolderCode: uuidv4(),
    accountHolderDetails: {
      email: req.body.email,
      individualDetails: {
        name: {
          firstName: req.body.firstName,
          gender: "UNKNOWN",
          lastName: req.body.lastName
        }
      },
      address: {
        country: req.body.country
      }
    },
    createDefaultAccount: true,
    legalEntity: "Individual"
  }).then((resultat) => {
    console.log(resultat)
    res.json(resultat);
  }).catch((err) => {
    console.log(err)
    res.json(err);
  });
});

app.listen(port, () => console.log(`The application is listening on port ${port}!`))
