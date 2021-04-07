const express = require('express');
const cors = require('cors');

const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const articleRouter = require('./routes/article-router');

const app = express();
const apiPort = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/api', articleRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));