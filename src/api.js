const express = require('express');

const UserRouter = require('./routes/UserRouter');
const CategoryRouter = require('./routes/CategoryRouter');
const PostRouter = require('./routes/PostRouter');

// ...

const app = express();

app.use(express.json());

app.use('/', UserRouter);
app.use('/', CategoryRouter);
app.use('/', PostRouter);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
