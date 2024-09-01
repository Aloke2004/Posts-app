const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
 const methodOverride = require("method-override");
 app.use(methodOverride('_method'));

app.use(express.urlencoded({extended : true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let port = 8080;

let posts = [
    {
        id: uuidv4(),
        username: "Aloke Gupta",
        content: "I love watching cricket",
    },
    {
        id: uuidv4(),
        username: "Bunny",
        content: "I love watching BTS",
    },
    {
        id: uuidv4(),
        username: "Abhinav",
        content: "I am mulla",
    },
    {
        id: uuidv4(),
        username: "Battery",
        content: "I am battery",
    }
];

app.listen(port, ()=>{
    console.log("App is listening on port : 8080");
});

app.get("/",(req,res)=>{
    res.send("Server working well!!");
});

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post) => id===post.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((post) => id===post.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((post) => id===post.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((post) => id!==post.id);
    res.redirect("/posts");
});



