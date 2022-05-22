const PostModel = require('../models/PostModel')
let userModel = require('../models/UserModel');

// Create and Save a new user
exports.create = async (req, res,) => {
    if (!req.body.text) {
        res.status(400).send({ message: "Content can not be empty!" });
//        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    const post = new PostModel({
        authorId: req.user._id,
//        authorId: req.params.id,
        text: req.body.text,
        date: Date.now()
    });

    await post.save().then(data => {
        res.render("status",{
            typeOfModel: "Post",
            typeOfOperation: "Create",
            message: "Post created succesfully!"
        })
//        res.render("profile");
/*        res.send({
            message:"Post created successfully!!",
            post:data
        });*/
//        res.render('results', {mydata: "user "+ data.firstName +" created succesfully!"})
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
//        res.render('results', {mydata: err.message || "Some error occurred while creating user"})
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const post = await PostModel.find();
        res.status(200).json(post);
//        res.status(200).render('results', {mydata: user})
    } catch(error) {
//        res.status(404).render('results', {mydata: error.message})
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
//        const user = await UserModel.findOne({email: req.query.email}).exec(); //change params to query
        const post = await PostModel.findOne({author: req.query.username}).exec();
        //const user = await UserModel.findById(req.query.id); //change params to query
        //res.status(200).json(user);
        // res.status(200).render('results', {mydata: "user :"+ user.firstName +" "
        //         + user.lastName +" "+ user.email +" "+ user.phone
        // })
        res.status(200).json(post);
//        res.render('otherProfile.ejs');
    } catch(error) {
        res.status(404).json({ message: error.message});
//        res.status(404).render('results', {mydata: error.message})
    }
};
// Update a user by the id in the request
exports.updateText = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.postId;

    await PostModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Post not found.`
            });
        }else{
            res.send({ message: "Post updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.updateComplain = async (req,res) => {
    const id = req.params.id;

    let post={isComplained: true};
    let postq= await PostModel.findById(id);
    let user=await userModel.findById(postq.authorId);
//    console.log(user);
    await PostModel.findByIdAndUpdate(id, post, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Post not found.`
            });
        }else{
            res.redirect("/user/find/"+user.username);
//            res.send({ message: "Post updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
//    console.log(req.params.id);
    //await UserModel.findByIdAndRemove(req.params.id).then(data => {
    await PostModel.deleteOne({_id: req.params.id}).then(data => {
        //await UserModel.findByIdAndRemove(req.query.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Post not found.`
            });
//            res.status(404).render('results', {mydata: "User not found"})

        }else if(data.deletedCount===0){
            res.render("status",{
                typeOfModel: "Contact",
                typeOfOperation: "Delete all contacts",
                message: "Contacts not found"
            });
            // res.status(404).send({
            //     message: `Contacts not found.`
            // });
        }  else {
            res.render("status",{
                typeOfModel: "Post",
                typeOfOperation: "Delete post",
                message: "Post deleted successfully!"
            })
/*            res.send({
                message: "Post deleted successfully!"
            });*/
//            res.render('results', {mydata: "user "+data.firstName+" deleted succesfully!"})
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
//        res.status(500).render('results', {mydata: err.message})
    });
};