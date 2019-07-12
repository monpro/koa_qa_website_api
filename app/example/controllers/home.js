const path = require('path');
class HomeCtl {
    index(context){
        context.body = 'this is main page';
    }

    upload(context){
        const file = context.request.files.file;
        const baseName = path.basename(file.path);
        context.body = {url: `${context.origin}/uploads/${baseName}`};
    }
}

module.exports = new HomeCtl();