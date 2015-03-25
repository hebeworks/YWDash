module.exports = function (app) {
    var express = require('express');
    var storyRouter = express.Router();

    storyRouter.get('/', function (req, res) {
        res.send({
            'story': [
                { id: 1, title: 'Test Story 1' },
                { id: 2, title: 'Test Story 2' },
                { id: 3, title: 'Test Story 3' }
            ]
        });
    });

    storyRouter.post('/', function (req, res) {
        res.status(201).end();
    });

    storyRouter.get('/:id', function (req, res) {
        res.send({
            'story': {
                id: req.params.id
            }
        });
    });

    storyRouter.put('/:id', function (req, res) {
        res.send({
            'story': {
                id: req.params.id
            }
        });
    });

    storyRouter.delete('/:id', function (req, res) {
        res.status(204).end();
    });

    app.use('/api/stories', storyRouter);
};
