const express = require('express');
const userSessions = require('./user_1_2/sessions/index');
const app = express();

app.get('/', async (req, res, next) => {
    res.send('Hello');
});

app.get('/user_1_2/sessions/:id', async (req, res, next) => {
    try {
        if (!req.params.id) {
            throw new Error('id is required');
        }
        const results = await userSessions.run(req, res, next);
        res.send(results.locals);
    } catch (error) {
        next(error);
    }
});

app.use(async (err, req, res, next) => {
    console.log(err);
    res.status(500).send('something is wrong');
});



app.listen(3000, () => console.log('Server running on port 3000'));