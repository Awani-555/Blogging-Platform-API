const express = require('express');
const app=express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

app.get("/status",(req,res) => {
    const status={
        "status": "Running"
    };
    res.send(status);
})

let posts=[];
let postId=1;

//CREATING A BLOG POST[POST]
app.post('/posts',(req,res) => {
const {title,content,category,tags} = req.body;


const errors=[];
//VALIDATE INPUTS

  if (!title || typeof title !== 'string') {
    errors.push("Title is required and must be a string.");
  }

  if (!content || typeof content !== 'string') {
    errors.push("Content is required and must be a string.");
  }

  if (!category || typeof category !== 'string') {
    errors.push("Category is required and must be a string.");
  }

  if (!Array.isArray(tags)) {
    errors.push("Tags must be an array.");
  }

  //IF VALIDATION FAILS,RETURN 404 BAD REQUEST
    
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }


  //create new post object
   const now = new Date().toISOString();
  const newPost = {
    id: postId++,
    title,
    content,
    category,
    tags,
    createdAt: now,
    updatedAt: now
  };

    // Step 4: Save to posts array
  posts.push(newPost);

  // Step 5: Return 201 Created
  return res.status(201).json(newPost);

})

//UPDATING THE BLOG
app.put('/posts/:id',(req,res) =>{
    const {title , content ,category ,tags} = req.body;
    const postIdToUpdate = parseInt(req.params.id);

    const errors=[];
    //VALIDATING INPUTS

    
  if (!title || typeof title !== 'string') {
    errors.push("Title is required and must be a string.");
  }
  if (!content || typeof content !== 'string') {
    errors.push("Content is required and must be a string.");
  }
  if (!category || typeof category !== 'string') {
    errors.push("Category is required and must be a string.");
  }
  if (!Array.isArray(tags)) {
    errors.push("Tags must be an array.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  //FINDING THE POST TO UPDATE
   const post=posts.find(p=>p.id === postIdToUpdate);

   if(!post){
    return res.status(404).json({ error: "Post not found." });
   }

     // Update post fields
  post.title = title;
  post.content = content;
  post.category = category;
  post.tags = tags;
  post.updatedAt = new Date().toISOString(); // Update timestamp

  // Return updated post
  return res.status(200).json(post);
});