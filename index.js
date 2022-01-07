const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
let rp = require('request-promise')
//const { default: fetch } = require('node-fetch');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}))


const port = process.env.PORT || 3200

app.all('*', (req, res) => {
  let options;
  console.log(req.url, req.method, req.body);
  // const response = { url: req.url, method: req.method, body: req.body };
  // return res.send(response)
  switch (req.method) {
    case 'GET': {
      options = {
        method: 'GET',
        uri: `http://52.54.121.175:7001${req.url}`,
        headers: {
          'Content-Type': 'application/json'
        },
      };
    }
      break;
    case 'POST': {
      options = {
        method: 'POST',
        uri: `http://52.54.121.175:7001${req.url}`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
      };
    }
      break;
    case 'DELETE': {
      options = {
        method: 'DELETE',
        uri: `http://52.54.121.175:7001${req.url}`,
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }
      break;
    case 'PUT': {
      options = {
        method: 'PUT',
        uri: `http://52.54.121.175:7001${req.url}`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
      };
    }
      break;
  }
  rp(options)
    .then(function (response) {
      return res.send(response);
    })
    .catch(function (err) {
      let status = err.response.status
      return res.status(status).send(err.response.data);
    });
})



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})