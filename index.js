const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const async = require('async')
let rp = require('request-promise')
//const { default: fetch } = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3200

app.all('*', (req, res) => {
  let options;
  console.log(req.url, req.method, req.body);
  switch (req.method) {
    case 'GET': {
      options = {
        method: 'GET',
        uri: 'http://3.219.48.24:7001/api/tags',
        headers: {
          'Content-Type': 'application/json'
        },
      };
      break;
    }
    case 'POST': {
      options = {
        method: 'POST',
        uri: 'http://localhost:3100/api/tags/post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
      };
    }
  }

  rp(options)
    .then(function (response) {
      return res.send(response);
    })
    .catch(function (err) {
      return res.send(err);
    });
})


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})