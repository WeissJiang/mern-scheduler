const express = require('express');
const cors = require('cors');
const app = express();
const setupDB = require('./utils/db');
const routes = require('./routes');
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

setupDB();

app.use(routes);

app.get('/test', (req, res) => {
    res.send('Hello Developer 2024!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})