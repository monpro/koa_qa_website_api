const Koa = require('koa');
const app = new Koa();
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const error = require('koa-json-error');
const mongoose = require('mongoose');
const path = require('path');
const parameter = require('koa-parameter');
const routing = require('./routes');
const {connectionString } = require('./config');

// mongoose.connect(connectionString, { useNewUrlParser: true } ,
//     () => console.log('database connection succeed'));
// mongoose.connection.on('error',console.error);

app.use(koaStatic(path.join(__dirname, 'public')))
app.use(error({
    postFormat: (e,{stack,...rest})=> process.env.NODE_ENV === 'production' ? rest: {stack, ...rest}
}));

app.use(koaBody({
    multipart: true,
    formidable:{
        uploadDir: path.join(__dirname, 'public/uploads'),
        keepExtensions: true
    }
}));


app.use(parameter(app));
routing(app);

module.exports = app.listen(3000, () => console.log("service starting at 3000"));

