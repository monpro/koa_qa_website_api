const Router = require('koa-router');
const router = new Router({prefix: '/users'});
const jwt = require('koa-jwt');
const jsonWebToken = require('jsonwebtoken');
const {find, findById, create,
        update, delete: del,login,
        checkOwner, listFollowing, listFollower,
        follow, unFollow, checkUserExist} = require('../controllers/users');

const {secret} = require("../config");
const auth = jwt({secret});


router.get('/', find);

router.post('/', create);


router.get('/:id', findById);

router.patch('/:id', auth, checkOwner, update);

router.delete('/:id', auth, checkOwner, del);

router.post('/login',login);

router.get('/:id/following', listFollowing);

router.get('/:id/followers', listFollower);

router.put('/following/:id', auth, checkUserExist, follow);

router.delete('/following/:id', auth,checkUserExist, unFollow);
module.exports = router;