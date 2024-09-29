const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 7234;
const routes = require('./app/routes/routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("hello"));
app.use('/api', routes);

app.listen(port, () => console.log("Server listening on port " + port));
