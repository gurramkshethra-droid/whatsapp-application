const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Added the path module

const app = express();
const port = 3000; 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory data storage for the blog
let posts = [];
let nextId = 1;

// --- Serve the HTML UI ---
app.get("/", (req, res) => {
    // Serve the index.html from the templates folder
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Existing routes
app.get("/about", (req, res) => {
    res.send("About us");
});

app.get("/list", (req, res) => {
    res.json([
        {"name":"Pavan", "age": 30, "city": "Hyderabad"}, 
        {"name":"Ravi", "age": 25, "city": "Bangalore"}, 
        {"name":"Sita", "age": 28, "city": "Chennai"}, 
        {"name":"Gita", "age": 32, "city": "Mumbai"}
    ]);
});

// --- Blog CRUD & Search Functionality ---

// Search functionality (Must be defined before /posts/:id)
app.get("/posts/search", (req, res) => {
    const searchQuery = req.query.q;
    
    if (!searchQuery) {
        return res.status(400).json({ error: "Search query 'q' is required." });
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(lowerCaseQuery) || 
        post.content.toLowerCase().includes(lowerCaseQuery)
    );

    res.json(filteredPosts);
});

// Create (POST) a new blog post
app.post("/posts", (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required." });
    }

    const newPost = {
        id: nextId++,
        title,
        content,
        author: author || "Anonymous",
        createdAt: new Date().toISOString()
    };

    posts.push(newPost);
    res.status(201).json(newPost);
});

// Read (GET) all blog posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

// Read (GET) a single blog post by ID
app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: "Post not found." });
    }

    res.json(post);
});

// Update (PUT) a blog post by ID
app.put("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const { title, content, author } = req.body;
    
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ error: "Post not found." });
    }

    // Update fields if provided in request body, otherwise keep existing
    posts[postIndex] = {
        ...posts[postIndex],
        title: title || posts[postIndex].title,
        content: content || posts[postIndex].content,
        author: author || posts[postIndex].author,
        updatedAt: new Date().toISOString()
    };

    res.json(posts[postIndex]);
});

// Delete (DELETE) a blog post by ID
app.delete("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === postId);

    if (postIndex === -1) {
        return res.status(404).json({ error: "Post not found." });
    }

    const deletedPost = posts.splice(postIndex, 1);
    res.json({ message: "Post deleted successfully.", post: deletedPost[0] });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});