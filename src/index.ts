import express from 'express';
import bodyParser from 'body-parser';
import usersRouters from './routes/users';

const port = 7234;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', usersRouters);

app.listen(port, () => console.log("Server listening on port " + port));
