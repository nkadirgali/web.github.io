const UserModel = require('../models/UserModel')
// Create and Save a new user
const passport = require("passport");

exports.create = async (req, res,) => {
    let user = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        username: req.body.username,
        posts: [],
        likedPosts: [],
        subscribers: [],
        subscriptions: [],
        statusAcc: false,
        isModerator: false,
        isAdmin: false
    });
    UserModel.register(/*{username: req.body.username,email: req.body.email}*/user, req.body.password, function (err, user) {
        if (err){
            console.log(err)
            res.redirect("/register")
        }else {
            passport.authenticate("local")(req, res, function () {
//                console.log(req);
                res.redirect("/")
            });
        }
    })
/*    if (!req.body.email && !req.body.fullName && !req.body.username && !req.body.password) {
        res.status(400).send({ message: "Content can not be empty!" });
//        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    const user = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password
    });

    await user.save().then(data => {
        res.render("status",{
            typeOfModel: "User",
            typeOfOperation: "Create",
            message: "User created succesfully!"
        })
/*        res.send({
            message:"User created successfully!!",
            user:data
        });
//        res.render('results', {mydata: "user "+ data.firstName +" created succesfully!"})
    }).catch(err => {
        res.render("register",{
            message: err.message || "Some error occurred while creating user"
        })
/*        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
//        res.render('results', {mydata: err.message || "Some error occurred while creating user"})
    });*/
};
exports.login = async (req, res) => {
    let user =new UserModel({
        username:req.body.username,
        password:req.body.password
    })
    req.login(user, function (err){
        if (err){
            console.log(err);
            res.render("login",{message: err.message})
        }else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/")
            });
        }
    })
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find().exec();

        res.status(200).json(user);
//        res.status(200).render('results', {mydata: user})
    } catch(error) {
//        res.status(404).render('results', {mydata: error.message})
        res.status(404).json({message: error.message});
    }
};
exports.findAllAdmin = async (req, res) => {
    try {
        const user = await UserModel.find();

    }catch (error){

    }
}
// Find a single User with an id
exports.findOne = async (req,res) => {
    try {
//        console.log(req.user);
//        console.log(req.params.username);
//        const user = await UserModel.findOne({email: req.query.email}).exec(); //change params to query
        const user = await UserModel.findOne({username: req.params.username}).exec();
        //const user = await UserModel.findById(req.query.id); //change params to query
        //res.status(200).json(user);
        // res.status(200).render('results', {mydata: "user :"+ user.firstName +" "
        //         + user.lastName +" "+ user.email +" "+ user.phone
        // })
//        console.log(user);
        let posts = await require('../models/PostModel').find({authorId: user._id}).sort({date: -1}).exec();
//        console.log(posts);
        let div1="<div style=\"display: flex;flex-direction: column;width: 100%;margin-top: 10px;\">\n" +
                "                    <div style=\"display: flex;width: 100%;flex-direction: column;background-color: #666666;padding: 10px;border: 1px solid black;\">\n" +
                "                        <div style=\"display: flex;flex-direction: row;width: 100%;justify-content: space-between;\">\n" +
                "                            <ul class=\"navbar-nav\" style=\"display: flex;flex-direction: row;align-items: center;\">\n" +
                "                                <li class=\"nav-item\" style=\"margin-right: 5px\">\n" +
                "                                    <div class=\"text-white\">username: ",
            div2="</div>\n" +
                "                                </li>\n" +
                "                                <li>|</li>\n" +
                "                                <li class=\"nav-item\" style=\"margin: 0 5px;\">\n" +
                "                                    <div>Date: ",
            div3="</div>\n" +
                "                                </li>\n" +
                "                            </ul>\n" +
                "                            <div class=\"dropdown\" style=\"align-items: stretch;display: flex;background-color: white;border-radius: 10px;\">\n" +
                "                                <button type=\"button\" class=\"btn\" style=\"border: 0 solid black;\" data-bs-toggle=\"dropdown\">\n" +
                "                                    <svg aria-label=\"Параметры\" class=\"_8-yf5 \" color=\"#262626\" fill=\"#262626\" height=\"24\" role=\"img\" viewBox=\"0 0 24 24\" width=\"24\">\n" +
                "                                        <circle cx=\"12\" cy=\"12\" fill=\"none\" r=\"8.635\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></circle>\n" +
                "                                        <path d=\"M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096\" fill=\"none\" stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"2\"></path>\n" +
                "                                    </svg>\n" +
                "                                </button>\n" +
                "                                <ul class=\"dropdown-menu\">\n" +
                "                                    <li>\n" +
                "                                        <form method=\"post\" action=\"/post/updateComplain/",
            div4="?_method=PATCH\">\n" +
                "                                            <button type=\"submit\" style=\"width: 100%;\" class=\"text-danger\">Complain <i class=\"fa-solid fa-triangle-exclamation\"></i></button>\n" +
                "                                        </form>\n" +
                "                                    </li>\n" +
                "    <!--                                <li><a class=\"dropdown-item text-danger\" href=\"/accounts/delete\">Delete account</a></li>-->\n" +
                "    <!--                                &lt;!&ndash;                                    <li><a class=\"dropdown-item\" href=\"#\">Link 3</a></li>&ndash;&gt;-->\n" +
                "    <!--                                <li><hr class=\"dropdown-divider\"></li>-->\n" +
                "    <!--                                <li><a class=\"dropdown-item\" href=\"#\"><i class=\"fa-solid fa-arrow-right-from-bracket\"></i> Exit</a></li>-->\n" +
                "                                </ul>\n" +
                "                            </div>\n" +
                "    <!--                        <div style=\"display: flex;justify-content: end;align-items: center;\">-->\n" +
                "    <!--                            <form method=\"post\" action=\"/contact/delete/?id=?_method=DELETE\">-->\n" +
                "    <!--                                <button type=\"submit\"><i class=\"fa-solid fa-trash-can\"></i></button>-->\n" +
                "    <!--                            </form>-->\n" +
                "    <!--                        </div>-->\n" +
                "                        </div>\n" +
                "                        <div style=\"display: flex;flex-direction: row;padding-top: 10px;\">\n" +
                "                            <div style=\"width: 100%;border: 1px solid black;background-color: white;padding: 10px;\">",
            div5="</div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>",ans="";
        for(let i=0;i<posts.length;i++){
            ans+=div1+posts[i].author+div2+posts[i].date+div3+posts[i]._id+div4+posts[i].text+div5;
        }
        let kolPublications,kolFollowings,kolFollowers;
        if(user.subscribers==null) kolFollowings=0;
        else kolFollowings=user.subscribers.length;
        if(user.subscriptions==null) kolFollowers=0;
        else kolFollowers=user.subscriptions.length;
        /*        let content,x=require('./PostController').findAllOwn(req);
                x.then(data => {
                    console.log("data=|"+data+"|x");
                }).catch(error => {
                    console.log(error.message);
                });
                console.log(x);
                if(x=="" || x==null) content="";
                else content=x;*/
        /*        let content,x;
                x=require('../controllers/PostController').findAllOwn(req,res);
                console.log("x=|"+x+"|");
                console.log("content=|"+content+"|");*/
        res.render("otherProfile",{
            username: req.params.username,
            fullName: user.fullName,
            kolPublications: posts.length,
            kolFollowings: kolFollowings,
            kolFollowers: kolFollowers,
            content: ans
        })
    } catch(error) {
        res.status(404).json({ message: error.message});
//        res.status(404).render('results', {mydata: error.message})
    }
}
exports.findOneMy = async (req, res) => {
    try {
//        console.log(req.user);
//        console.log(req.params.username);
//        const user = await UserModel.findOne({email: req.query.email}).exec(); //change params to query
        const user = await UserModel.findOne({username: req.user.username}).exec();
        //const user = await UserModel.findById(req.query.id); //change params to query
        //res.status(200).json(user);
        // res.status(200).render('results', {mydata: "user :"+ user.firstName +" "
        //         + user.lastName +" "+ user.email +" "+ user.phone
        // })
//        console.log(user);
        let posts = await require('../models/PostModel').find({authorId: user._id}).sort({date: -1}).exec();
//        console.log(posts);
        let div1="<div style=\"display: flex;flex-direction: column;width: 100%;margin-top: 10px;\">\n" +
                "                    <div style=\"display: flex;width: 100%;flex-direction: column;background-color: #666666;padding: 10px;border: 1px solid black;\">\n" +
                "                        <div style=\"display: flex;flex-direction: row;width: 100%;justify-content: space-between;\">\n" +
                "                            <ul class=\"navbar-nav\" style=\"display: flex;flex-direction: row;align-items: center;\">\n" +
                "                                <li class=\"nav-item\" style=\"margin-right: 5px\">\n" +
                "                                    <div class=\"text-white\">username: ",
            div2="</div>\n" +
                "                                </li>\n" +
                "                                <li>|</li>\n" +
                "                                <li class=\"nav-item\" style=\"margin: 0 5px;\">\n" +
                "                                    <div>Date: ",
            div3="</div>\n" +
                "                                </li>\n" +
                "                            </ul>\n" +
                "                            <div class=\"dropdown\" style=\"align-items: stretch;display: flex;background-color: white;border-radius: 10px;\">\n" +
                "                                <button type=\"button\" class=\"btn\" style=\"border: 0 solid black;\" data-bs-toggle=\"dropdown\">\n" +
                "                                    <svg aria-label=\"Параметры\" class=\"_8-yf5 \" color=\"#262626\" fill=\"#262626\" height=\"24\" role=\"img\" viewBox=\"0 0 24 24\" width=\"24\">\n" +
                "                                        <circle cx=\"12\" cy=\"12\" fill=\"none\" r=\"8.635\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"></circle>\n" +
                "                                        <path d=\"M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096\" fill=\"none\" stroke=\"currentColor\" stroke-linejoin=\"round\" stroke-width=\"2\"></path>\n" +
                "                                    </svg>\n" +
                "                                </button>\n" +
                "                                <ul class=\"dropdown-menu\">\n" +
                "                                    <li>\n" +
                "                                        <form method=\"post\" action=\"/post/delete/",
            div4="?_method=DELETE\">\n" +
                "                                            <button type=\"submit\" style=\"width: 100%;\">Delete post <i class=\"fa-solid fa-trash-can\"></i></button>\n" +
                "                                        </form>\n" +
                "                                    </li>\n" +
                "    <!--                                <li><a class=\"dropdown-item text-danger\" href=\"/accounts/delete\">Delete account</a></li>-->\n" +
                "    <!--                                &lt;!&ndash;                                    <li><a class=\"dropdown-item\" href=\"#\">Link 3</a></li>&ndash;&gt;-->\n" +
                "    <!--                                <li><hr class=\"dropdown-divider\"></li>-->\n" +
                "    <!--                                <li><a class=\"dropdown-item\" href=\"#\"><i class=\"fa-solid fa-arrow-right-from-bracket\"></i> Exit</a></li>-->\n" +
                "                                </ul>\n" +
                "                            </div>\n" +
                "    <!--                        <div style=\"display: flex;justify-content: end;align-items: center;\">-->\n" +
                "    <!--                            <form method=\"post\" action=\"/contact/delete/?id=?_method=DELETE\">-->\n" +
                "    <!--                                <button type=\"submit\"><i class=\"fa-solid fa-trash-can\"></i></button>-->\n" +
                "    <!--                            </form>-->\n" +
                "    <!--                        </div>-->\n" +
                "                        </div>\n" +
                "                        <div style=\"display: flex;flex-direction: row;padding-top: 10px;\">\n" +
                "                            <div style=\"width: 100%;border: 1px solid black;background-color: white;padding: 10px;\">",
            div5="</div>\n" +
                "                        </div>\n" +
                "                    </div>\n" +
                "                </div>",ans="";
        for(let i=0;i<posts.length;i++){
            ans+=div1+posts[i].author+div2+posts[i].date+div3+posts[i]._id+div4+posts[i].text+div5;
        }
        let kolPublications,kolFollowings,kolFollowers;
        if(user.subscribers==null) kolFollowings=0;
        else kolFollowings=user.subscribers.length;
        if(user.subscriptions==null) kolFollowers=0;
        else kolFollowers=user.subscriptions.length;
/*        let content,x=require('./PostController').findAllOwn(req);
        x.then(data => {
            console.log("data=|"+data+"|x");
        }).catch(error => {
            console.log(error.message);
        });
        console.log(x);
        if(x=="" || x==null) content="";
        else content=x;*/
/*        let content,x;
        x=require('../controllers/PostController').findAllOwn(req,res);
        console.log("x=|"+x+"|");
        console.log("content=|"+content+"|");*/
        res.render("profile",{
            username: req.user.username,
            fullName: user.fullName,
            kolPublications: posts.length,
            kolFollowings: kolFollowings,
            kolFollowers: kolFollowers,
            content: ans
        })
    } catch(error) {
        res.status(404).json({ message: error.message});
//        res.status(404).render('results', {mydata: error.message})
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const username = req.user.username;
    const user = await UserModel.findOne({username: username}).exec();
    const id = user._id;
//    console.log(req.body);

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.redirect("/profile")
//            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
exports.updateComplain = async (req, res) => {
    const username = req.params.username;
    const user = await UserModel.findOne({username: username}).exec();
    const id = user._id;
    let complain={isComplained: true};
//    console.log(req.params.username+"|user|"+user);

    await UserModel.findByIdAndUpdate(id, complain, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.redirect("/user/find/"+username);
//            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    //await UserModel.findByIdAndRemove(req.params.id).then(data => {
    await UserModel.deleteOne({username: req.params.username}).then(data => {
    //await UserModel.findByIdAndRemove(req.query.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
//            res.status(404).render('results', {mydata: "User not found"})

        } else {
            res.send({
                message: "User deleted successfully!"
            });
//            res.render('results', {mydata: "user "+data.firstName+" deleted succesfully!"})
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
//        res.status(500).render('results', {mydata: err.message})
    });
};

exports.destroyAllUsers = async (req, res) => {
    //await UserModel.findByIdAndRemove(req.params.id).then(data => {
    await UserModel.deleteMany({statusAcc: false}).then(data => {
        //await UserModel.findByIdAndRemove(req.query.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Users not found.`
            });
//            res.status(404).render('results', {mydata: "User not found"})

        } else {
            res.send({
                message: "Users deleted successfully!"
            });
//            res.render('results', {mydata: "user "+data.firstName+" deleted succesfully!"})
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
//        res.status(500).render('results', {mydata: err.message})
    });
};