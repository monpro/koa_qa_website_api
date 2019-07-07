
class HomeCtl {
    index(context){
        context.body = 'this is main page';
    }
}

module.exports = new HomeCtl();