//app config
var express=require("express");
var method_override=require("method-override");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/Blog", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(method_override("_method"))
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
//schema
var blog_schema =new mongoose.Schema({
    title:String,
    image:String,
    body :String,
    created:
            {type:Date,
            default:Date.now}


});
//model
var blog=mongoose.model("Blog",blog_schema)
//routes
/*blog.create({
    title:"kashif Khan",
    image:"https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."

})*/
app.get("/",function(req,res){

    res.redirect("/blogs");

    
})
app.get("/blogs",function(req,res){
    blog.find({},function(err,blogs){
        if (err){
            console.log(error)
        }
        else{
            
            res.render("index",{ blogs: blogs});
            
        }

    })
})
app.post("/blogs",function(req,res){
    blog.create(req.body.blog,function(err,newblog){
        if (err){
            res.render("new")
            console.log(error)
        }
        else{
            
            res.redirect("/blogs")
            
        }

    })
})
app.get("/blogs/new",function(req,res){
    
            
    res.render("new");
             
         
 
 })
app.get("/blogs/:id",function(req,res){
    blog.findById(req.params.id,function(err,found_blog){
        if (err){
            res.redirect('/blogs')
        }
        else{
            console.log("Found")
            res.render("show",{ blog: found_blog});
            
        }

    })
})
app.get("/blogs/:id/edit",function(req,res){
    blog.findById(req.params.id,function(err,found_blog){
        if (err){
            res.redirect('/blogs')
        }
        else{
            console.log("Found")
            res.render("edit",{ blog: found_blog});
            
        }

    })
})
app.put("/blogs/:id",function(req,res){
    blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,New_blog){
        if (err){
            res.redirect('/blogs')
        }
        else{
            res.redirect('/blogs/'+req.params.id)
            
        }

    })

})
app.delete("/blogs/:id",function(req,res){
    blog.findOneAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/blogs")
        }
        else {
            res.redirect("/blogs")
        }
    })

})


    
    

    
app.listen("4000",function(){
    console.log("Server Started")
})

  