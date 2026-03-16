const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000; 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/blogdb')
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schema & Model
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "Anonymous" }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);


// --- Blog CRUD & Search Functionality ---

// Search functionality (Must be defined before /posts/:id)
// Test in Postman: GET http://localhost:3000/posts/search?q=keyword
app.get("/posts/search", async (req, res) => {
    const searchQuery = req.query.q;
    
    if (!searchQuery) {
        return res.status(400).json({ error: "Search query 'q' is required." });
    }

    try {
        const filteredPosts = await Post.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        res.json(filteredPosts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Create (POST) a new blog post
// Test in Postman: POST http://localhost:3000/posts
// Body (JSON): { "title": "My First Post", "content": "Hello World", "author": "John" }
app.post("/posts", async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required." });
    }

    try {
        const newPost = new Post({
            title,
            content,
            author: author || "Anonymous"
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: "Failed to create post." });
    }
});

// Read (GET) all blog posts
// Test in Postman: GET http://localhost:3000/posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts." });
    }
});

// Read (GET) a single blog post by ID
// Test in Postman: GET http://localhost:3000/posts/<mongo_id>
app.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        res.json(post);
    } catch (error) {
        res.status(400).json({ error: "Invalid Post ID." });
    }
});

// Update (PUT) a blog post by ID
// Test in Postman: PUT http://localhost:3000/posts/<mongo_id>
// Body (JSON): { "title": "Updated Title", "content": "Updated content" }
app.put("/posts/:id", async (req, res) => {
    const { title, content, author } = req.body;
    
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { 
                ...(title && { title }), 
                ...(content && { content }), 
                ...(author && { author }) 
            },
            { new: true } // Returns the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found." });
        }

        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ error: "Invalid Post ID or update failed." });
    }
});

// Delete (DELETE) a blog post by ID
// Test in Postman: DELETE http://localhost:3000/posts/<mongo_id>
app.delete("/posts/:id", async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) {
            return res.status(404).json({ error: "Post not found." });
        }

        res.json({ message: "Post deleted successfully.", post: deletedPost });
    } catch (error) {
        res.status(400).json({ error: "Invalid Post ID." });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});