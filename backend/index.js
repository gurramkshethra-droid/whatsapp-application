const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
//importing packages
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

let posts=[]
let users=[]
let nextUserId=1
let nextId=1


/* ---------- HTML ROUTES ---------- */

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,'templates','login.html'))
})

app.get("/register",(req,res)=>{
res.sendFile(path.join(__dirname,'templates','register.html'))
})

app.get("/dashboard",(req,res)=>{
res.sendFile(path.join(__dirname,'templates','index.html'))
})


/* ---------- USER ROUTES ---------- */

app.post("/register",(req,res)=>{

const {username,password}=req.body

if(!username || !password)
return res.status(400).json({error:"username password required"})

const exist=users.find(u=>u.username===username)

if(exist)
return res.status(400).json({error:"user exists"})

const user={
id:nextUserId++,
username,
password
}

users.push(user)

res.json({message:"registered"})
})


app.post("/login",(req,res)=>{

const {username,password}=req.body

const user=users.find(
u=>u.username===username && u.password===password
)

if(!user)
return res.status(401).json({error:"invalid login"})

res.json({message:"login success",user})

})


/* ---------- BLOG ROUTES ---------- */

app.get("/posts",(req,res)=>{
res.json(posts)
})


app.post("/posts",(req,res)=>{

const {title,content,author,category,tags,status}=req.body

if(!title || !content)
return res.status(400).json({error:"title content required"})

const post={
id:nextId++,
title,
content,
author:author || "Anonymous",
category:category || "General",
tags:tags || [],
status:status || "draft",
likes:0,
comments:[],
createdAt:new Date()
}

posts.push(post)

res.json(post)

})


app.get("/posts/:id",(req,res)=>{

const id=parseInt(req.params.id)

const post=posts.find(p=>p.id===id)

if(!post)
return res.status(404).json({error:"not found"})

res.json(post)

})


app.put("/posts/:id",(req,res)=>{

const id=parseInt(req.params.id)

const index=posts.findIndex(p=>p.id===id)

if(index===-1)
return res.status(404).json({error:"not found"})

posts[index]={...posts[index],...req.body}

res.json(posts[index])

})


app.delete("/posts/:id",(req,res)=>{

const id=parseInt(req.params.id)

const index=posts.findIndex(p=>p.id===id)

if(index===-1)
return res.status(404).json({error:"not found"})

posts.splice(index,1)

res.json({message:"deleted"})

})


/* ---------- LIKE ---------- */

app.post("/posts/:id/like",(req,res)=>{

const id=parseInt(req.params.id)

const post=posts.find(p=>p.id===id)

if(!post)
return res.status(404).json({error:"not found"})

post.likes++

res.json({likes:post.likes})

})


/* ---------- COMMENT ---------- */

app.post("/posts/:id/comment",(req,res)=>{

const id=parseInt(req.params.id)

const {text}=req.body

const post=posts.find(p=>p.id===id)

if(!post)
return res.status(404).json({error:"not found"})

post.comments.push({
text,
date:new Date()
})

res.json(post.comments)

})


/* ---------- SEARCH ---------- */

app.get("/posts/search",(req,res)=>{

const q=req.query.q.toLowerCase()

const result=posts.filter(p=>
p.title.toLowerCase().includes(q) ||
p.content.toLowerCase().includes(q)
)

res.json(result)

})


app.listen(port,()=>{
console.log("Server running http://localhost:3000")
})
