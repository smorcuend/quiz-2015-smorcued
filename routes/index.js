'use strict';
var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Quiz',
        errors: []
    });
});

router.get('/author', function(req, res) {
    res.render('author', {
        author: {
            name: 'Sergio Morcuende',
            photo: 'https://secure.gravatar.com/avatar/e6d3615526e445be25d03161c730e481?size=496&default=retro'
        },
        errors: []
    });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); // autoload :quizId

router.get('/quizes', quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new', quizController.new);
router.post('/quizes/create', quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizes/:quizId(\\d+)', quizController.update);
router.delete('/quizes/:quizId(\\d+)', quizController.destroy);

module.exports = router;
