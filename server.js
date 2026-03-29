const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Social Media Platform API Running');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

let posts = [];
let id = 1;

app.post('/posts', (req, res) => {
    const { title, content } = req.body;

    const newPost = {
        id: id++,
        title,
        content
    };

    posts.push(newPost);
    res.json(newPost);
});

app.get('/posts', (req, res) => {
    res.json(posts);
});

app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);

    if (!post) {
        return res.status(404).send('Post not found');
    }

    post.title = req.body.title;
    post.content = req.body.content;

    res.json(post);
});

app.delete('/posts/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.send('Post deleted');
});