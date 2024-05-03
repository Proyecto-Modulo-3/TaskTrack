require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('./middlewares/cors.middleware')

require('./configs/db.config');

const app = express();

//middlewares

app.use(logger('dev'));
app.use(express.json());
app.use(cors);

//routes
const router = require('./configs/routes.config')
app.use('/api', router)

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' })
})

app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.info(`Application running at port ${port}`));