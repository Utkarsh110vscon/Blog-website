import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import env from "dotenv";
import nodemailer from "nodemailer";

env.config();
const port=3000;
const app= express();
const API_URL="http://localhost:4000";

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(express.static('public'));

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.get("/", async(req, res) => {
   try{
    const response= await axios.get(API_URL+"/random");
    const result=response.data;
    res
    .status(200)
    .render("index.ejs", { post:result });

   }catch(error){
    console.log(error.message);
   }
});

app.get("/blogs", async(req, res) => {
    const response= await axios.get(API_URL+"/all");
    const result= response.data;
    res
    .status(200)
    .render("blog.ejs", { post:result });
});

app.get("/createBlog", (req, res) => {
    res.render("create_blog.ejs");
});

app.get("/edit/:id", async (req, res) => {
  const response = await axios.get
    (`${API_URL}/posts/${req.params.id}`);
  const result=response.data[0];
  console.log(result.data);
  res.render("create_blog.ejs", { post_data:result });
});
  
// Create a new post
  app.post("/createBlog/posts", async (req, res) => {
    const response= await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/blogs");
  });
  
  // Partially update a post
  app.post("/posts/update/:id", async (req, res) => {
   const data=req.body;
   const response = await axios.patch(API_URL+"/update/"+req.params.id, data);
    console.log(response.data);
    res.redirect("/blogs");
  });
  
  // Delete a post
  app.get("/api/posts/delete/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const response= await axios.delete(`${API_URL}/delete/${id}`);
    console.log(response.data);
    res.redirect("/blogs");
  });

  //Delete all post
  app.post("/admin", async (req, res) => {
    // console.log(req.body);
    const userPassword = req.body.encryptionKey;
    if(userPassword===process.env.PASSWORD){
      const response= await axios.delete(API_URL+"/deleteAll");
      res
      .redirect("/blogs");
    }else{
      res.json({ message: "You are not authorized to perform this action!"});
    }
  })

  //sending mail
  app.post("/emailSend", (req, res) => {
    console.log("entered emailSend route",req.body);
    const email= req.body.emailOfClient;
    let mailOption= {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'Email from the node server', 
      text: 'this email is given to you because you have Subscribed to our service'
    }

    transporter.sendMail(mailOption, (error, info) => {
      if(error){
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      res.redirect("/");
    })
  });

app.listen(port, () => {
    console.log(`The App is running on: http://localhost:${port}`);
});