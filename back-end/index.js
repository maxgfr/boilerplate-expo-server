const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();
const axios = require("axios");
const { Client, Config } = require('@adyen/api-library');
const app = express();
const port = 3000;
const config = new Config();
config.apiKey = process.env.API_KEY;
const client = new Client({ config });
client.setEnvironment(process.env.ENV);
console.log(client)

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cors());

app.get('/', (req, res, next) => {
  res.json({success: true});
})

app.post('/createAccount', (req, res, next) => {
    // stripe.customers.create({
    //   name: req.body.name,
    //   email: req.body.email
    // }).then((resultat) => {
    //   console.log(resultat)
    //   res.json(resultat);
    // }).catch((err) => {
    //   console.log(err);
    //   res.json(err);
    // });
    res.json({nn: 'oui'})
});

app.listen(port, () => console.log(`The application is listening on port ${port}!`))
