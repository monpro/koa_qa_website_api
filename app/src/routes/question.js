const Router = require('koa-router');
const router = new Router({prefix: '/questions'});
const jwt = require('koa-jwt');
const {find, findById, create, delete: del,
        update, checkQuestionExist, checkQuestioner,
        } = require('../controllers/questions');

const {secret} = require("../config");
const auth = jwt({secret});


router.get('/', find);

router.post('/', auth, create);

router.get('/:id', checkQuestionExist, findById);

router.delete('/:id', auth, checkQuestionExist,checkQuestioner, del);

router.patch('/:id', auth, checkQuestionExist, update);


module.exports = router;