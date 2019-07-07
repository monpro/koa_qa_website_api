const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const routing = require('./routes');


app.use(bodyParser());
routing(app);

app.listen(3000, () => console.log("service starting at 3000"));