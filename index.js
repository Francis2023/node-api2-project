const express = require('express');

const Posts = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req,res) => {
    res.send(`
       <h2>Blog API</h>
    `);
});

//Get
//------------------------------------------------------------------------

server.get('/api/posts', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The posts information could not be retrieved.',
        });
      });
})
//Get posts by Id
server.get('/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
          }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The post information could not be retrieved.',
        });
      });
})
//Get comment by Id
server.get('/api/posts/:id/comments', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
          }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The comments information could not be retrieved.',
        });
      });
})
//Post
//---------------------------------------------------------------------------------------------------
server.post('/api/posts', (req, res) => {
    Posts.add(req.body)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'There was an error while saving the post to the database',
        });
      });
})
//Post comments
server.post('/api/posts/:id/comments', (req, res) => {
    Posts.add(req.body)
    .then(comment => {
        res.status(201).json(comment)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'There was an error while saving the comment to the database',
        });
      });
})
//Delete
//------------------------------------------------------------------------------------
server.delete('/api/posts/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'The hub has been nuked' });
          } else {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
          }
    })
    .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'The post could not be removed',
        });
    });
});
//Update
//---------------------------------------------------------------------------------------------
server.put('/api/posts/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(post => {
        if (post) {
              res.status(200).json(post);
            } else {
              res.status(404).json({ message: 'The post with the specified ID does not exist.' });
            }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          message: 'The post information could not be modified.',
        });
      }); 
})