var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Quiz'
    });
});

router.get('/author', function(req, res) {
    res.render('author', {
        author: {
            name: 'Sergio Morcuende',
            photo: 'https://secure.gravatar.com/avatar/e6d3615526e445be25d03161c730e481?size=496&default=retro'
        }
    })
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer', quizController.answer);


module.exports = router;
