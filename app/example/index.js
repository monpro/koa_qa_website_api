const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const error = require('koa-json-error');
const mongoose = require('mongoose');
const parameter = require('koa-parameter');
const routing = require('./routes');
const {connectionString } = require('./config');

mongoose.connect(connectionString, { useNewUrlParser: true } ,() => console.log('database connection succeed'));
mongoose.connection.on('error',console.error);

app.use(error({
    postFormat: (e,{stack,...rest})=> process.env.NODE_ENV === 'production' ? rest: {stack, ...rest}
}));
app.use(bodyParser());
app.use(parameter(app));
routing(app);

app.listen(3000, () => console.log("service starting at 3000"));