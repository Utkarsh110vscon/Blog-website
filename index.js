import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import env from "dotenv";

env.config();
const app=express();
const port=4000;
const db = new pg.Client({
  user:process.env.PG_USER,
  database:process.env.PG_DATABASE,
  host:process.env.PG_HOST,
  password:process.env.PG_PASSWORD,
  port:process.env.PG_PORT
});
db.connect();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
// In-memory data store
let posts = [];

  app.get("/random", async(req, res) => {
    try{
      const result= await db.query("SELECT * FROM posts ORDER BY RANDOM() LIMIT 2")
      // console.log(result.rows);  
      let arr=result.rows;
      res
        .status(200)
        .json(arr);
    }catch(error){
        console.log(error.message);
        res
        .status(500)
        .json({ Error: error.message });
    }
  });

  app.get("/all", async(req, res) => {
    try{
      const result =await db.query("SELECT * FROM posts ORDER BY id ASC");
      posts=result.rows;
      res.status(200)
      .json(posts)
    }catch(error){
      console.log(error.message);
        res
        .status(500)
        .json({ Error: error.message });
    }
  })

  //CHALLENGE 2: GET a specific post by id
  app.get("/posts/:id", async(req, res) => {
    try{
      const newId=parseInt(req.params.id);
      const result= await db.query("SELECT * FROM posts WHERE id = ($1)", [newId]);
      const obj=result.rows;
      res.status(200).json(obj);      
    }catch(err){
      console.log(err.message);
    }
  })
 

  //CHALLENGE 3: POST a new post
  app.post("/posts", async(req, res) => {
    try{
      const blog=req.body;
      await db.query("INSERT INTO posts(title, content, author, date) VALUES($1, $2, $3, $4)",
        [blog.blogTitle, blog.blogContent, blog.author, blog.time]);
      res
      .status(200)
      .json({message: "Data is stored in the server"});
    }catch(err){
      console.log(err);
      res.json(err);
    }
  })

  //CHALLENGE 4: PATCH a post when you just want to update one parameter
  app.patch("/update/:id", async(req, res) => {
    const id=(parseInt(req.params.id));
    const blog=req.body;
    await db.query("UPDATE posts SET title = $1, content = $2, author = $3, date = $4 WHERE id = $5",
      [blog.blogTitle, blog.blogContent, blog.author, blog.time, id]);
    res
      .status(200)
      .json({message : "success"});
  })

  //CHALLENGE 5: DELETE a specific post by providing the post id.
  app.delete("/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await db.query("DELETE FROM posts WHERE id = $1", [id]);
    res
      .status(200)
      .json({message : "data deleted successfully"});
  })

  app.delete("/deleteAll", async (req, res) => {
    console.log("delete all function");
    res.json({message:"ok"});
  })

app.listen(port, () => {
    console.log(`App is running on server http://localhost:${port}`);
});