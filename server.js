const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

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

const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');

app.post('/login', (req, res) => {
    const user = { username: req.body.username };

    const token = jwt.sign(user, 'secretkey');

    res.json({ token });
});

app.post('/protected-post', auth, (req, res) => {
    res.send('Protected post created');
});

app.set('view engine', 'ejs');

app.get('/view-posts', (req, res) => {
    res.render('posts', { posts });
});

app.post('/upload', upload.single('image'), (req, res) => {
    res.send('Image uploaded');
});

app.get('/posts/page/:num', (req, res) => {
    const page = parseInt(req.params.num);
    const limit = 2;

    const start = (page - 1) * limit;
    const end = start + limit;

    res.json(posts.slice(start, end));
});