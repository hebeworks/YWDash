module.exports = function(app) {
  var express = require('express');
  var storyRouter = express.Router();

  storyRouter.get('/', function(req, res) {
    res.send({
        'story': [
            { id: 1, title: 'test' }
        ]
    });
  });

  storyRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  storyRouter.get('/:id', function(req, res) {
    res.send({
      'story': {
        id: req.params.id
      }
    });
  });

  storyRouter.put('/:id', function(req, res) {
    res.send({
      'story': {
        id: req.params.id
      }
    });
  });

  storyRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/stories', storyRouter);
};
