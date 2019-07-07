const db = [{name:'mike'}]


class UserCtl {
    find(context){
        context.body = db;
    }
    findById(context){
        context.body = db[context.params.id];
    }
    create(context){
        db.push(context.request.body)
        context.body = context.request.body;
    }
    update(context){
        db[context.params.id * 1] = context.request.body;
        context.body = context.request.body;
    }
    delete(context){
        db.splice(context.params.id * 1, 1);
        context.status = 204;
    }
}

module.exports = new UserCtl();