const Router = require('koa-router');
const router = new Router({prefix: '/users'});
const jwt = require('koa-jwt');
const jsonWebToken = require('jsonwebtoken');
const {find, findById, create,
        update, delete: del,login,
        checkOwner, listFollowing, listFollower,
        follow, unFollow, checkUserExist,
        followTopic, unFollowTopic, listFollowingTopics} = require('../controllers/users');
const {checkTopicExist} = require('../controllers/topics');

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

router.get('/:id/followingTopics', listFollowingTopics);

router.delete('/following/:id', auth,checkUserExist, unFollow);

router.put('/followingTopics/:id', auth, checkTopicExist, followTopic);

router.delete('/followingTopics/:id', auth,checkTopicExist, unFollowTopic);

module.exports = router;