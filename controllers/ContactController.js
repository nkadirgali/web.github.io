const ContactModel = require('../models/ContactModel')
const UserModel = require("../models/UserModel");
// Create and Save a new user
exports.create = async (req, res,) => {
    if (!req.body.text) {
        res.status(400).send({ message: "Content can not be empty!" });
//        res.status(400).render('results', {mydata: "Content can not be empty!"})
    }

    const contact = new ContactModel({
        name: req.body.name,
        email: req.body.email,
        text: req.body.text,
        status: false,
        date: Date.now()
    });

    await contact.save().then(data => {
        res.render('contactUs',{
            message: "Message submitted successfully!"
        });
/*        res.send({
            message:"Message submitted successfully!!",
            post:data
        });*/
//        res.render('results', {mydata: "user "+ data.firstName +" created succesfully!"})
    }).catch(err => {
        res.render('contactUs',{
            message: err.message || "Some error occured while creating user"
        })
/*        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });*/
//        res.render('results', {mydata: err.message || "Some error occurred while creating user"})
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const contact = await ContactModel.find();
        let ans="";
        let div1="            <div style=\"display: flex;width: 100%;flex-direction: column;background-color: #666666;padding: 10px;border-bottom: 1px solid red;\">\n" +
            "                <div style=\"display: flex;flex-direction: row;width: 100%;justify-content: space-between;\">\n" +
            "                    <ul class=\"navbar-nav\" style=\"display: flex;flex-direction: row;align-items: center;\">\n" +
            "                        <li class=\"nav-item\" style=\"margin: 0 5px;\"><div class=\"text-white\">Name: ",
            div2="</div></li>\n" +
            "                        <li>|</li>\n" +
            "                        <li class=\"nav-item\" style=\"margin: 0 5px;\"><div>Email: ",
            div3="</div></li>\n" +
                "                    <li>|</li>\n" +
                "                    <li class=\"nav-item\" style=\"margin: 0 5px;\">\n" +
                "                        <div>Date: ",
            div4="</div>\n" +
                "                    </li>\n" +
            "                    </ul>\n" +
            "                    <div style=\"display: flex;justify-content: end;align-items: center;\">\n" +
            "                        <form method=\"post\" action=\"/contact/delete/",
            div5="?_method=DELETE\">\n" +
            "                            <button type=\"submit\"><i class=\"fa-solid fa-trash-can\"></i></button>\n" +
            "                        </form>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "                <div style=\"display: flex;flex-direction: row;padding-top: 10px;\">\n" +
            "                    <div style=\"width: 50px;\">Text: </div>\n" +
            "                    <div style=\"width: 100%;border: 1px solid black;background-color: white;padding: 10px;\">",
            div6="</div>\n" +
            "                </div>\n" +
            "            </div>";
        let done="<i class=\"fa-solid fa-check\"></i>",cross="<i class=\"fa-solid fa-xmark\"></i>";
        for (let i=0;i<contact.length;i++) {
            ans+=div1+contact[i].name+div2+contact[i].email+div3+contact[i].date+div4+contact[i]._id+div5+contact[i].text+div6;
        }
        res.render("adminContactUs",{
            content: ans
        });
//        res.status(200).json(contact);
//        res.status(200).render('results', {mydata: user})
    } catch(error) {
//        res.status(404).render('results', {mydata: error.message})
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
/*exports.findOne = async (req, res) => {
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
};*/
// Update a user by the id in the request
/*exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await ContactModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Contact not found.`
            });
        }else{
            res.send({ message: "Contact updated successfully.",data: data })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};*/
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
//    console.log(req.params.id);
    //await UserModel.findByIdAndRemove(req.params.id).then(data => {
    await ContactModel.deleteOne({_id: req.params.id}).then(data => {
        //await UserModel.findByIdAndRemove(req.query.id).then(data => {
        if (!data) {
            res.render("adminStatus",{
                typeOfModel: "Contact",
                typeOfOperation: "Delete contact",
                message: "Contact not found"
            });
            // res.status(404).send({
            //     message: `Contact not found.`
            // });
//            res.status(404).render('results', {mydata: "User not found"})

        } else {
            res.render("adminStatus",{
                typeOfModel: "Contact",
                typeOfOperation: "Delete contact",
                message: "Contact deleted succesfully!"
            });
//            console.log(data);
//             res.send({
//                 message: "Contact deleted successfully!"
//             });
//            res.render('results', {mydata: "user "+data.firstName+" deleted succesfully!"})
        }
    }).catch(err => {
        res.render("adminStatus",{
            typeOfModel: "Contact",
            typeOfOperation: "Delete contact",
            message: err.message
        });
        // res.status(500).send({
        //     message: err.message
        // });
//        res.status(500).render('results', {mydata: err.message})
    });
};
exports.destroyAllContacts = async (req, res) => {
    //await UserModel.findByIdAndRemove(req.params.id).then(data => {
    await ContactModel.deleteMany({status: false}).then(data => {
        //await UserModel.findByIdAndRemove(req.query.id).then(data => {
        if (!data) {
            res.render("adminStatus",{
                typeOfModel: "Contact",
                typeOfOperation: "Delete all contacts",
                message: "Contacts not found"
            });
            // res.status(404).send({
            //     message: `Contacts not found.`
            // });
//            res.status(404).render('results', {mydata: "User not found"})

        } else if(data.deletedCount===0){
            res.render("adminStatus",{
                typeOfModel: "Contact",
                typeOfOperation: "Delete all contacts",
                message: "Contacts not found"
            });
            // res.status(404).send({
            //     message: `Contacts not found.`
            // });
        } else {
            res.render("adminStatus",{
               typeOfModel: "Contact",
               typeOfOperation: "Delete all contacts",
               message: "All contacts deleted succesfully!"
            });
            // let html="<html>\n" +
            //     "    <head>\n" +
            //     "        <%- include('includes/links1')%>\n" +
            //     "        <title>Delete all</title>\n" +
            //     "    </head>\n" +
            //     "    <body>\n" +
            //     "        <a style='height: 20px;' href='/admin'>/*<i class=\"fa-solid fa-arrow-left\"></i>*/ Back to admin page</a>\n" +
            //     "    </body>\n" +
            //     "</html>";
            // res.send(html);
/*            res.send({
                message: "Contacts deleted successfully!"
            });*/
//            res.render('results', {mydata: "user "+data.firstName+" deleted succesfully!"})
        }
    }).catch(err => {
        res.render("adminStatus",{
            typeOfModel: "Contact",
            typeOfOperation: "Delete all contacts",
            message: err.message
        });
        // res.status(500).send({
        //     message: err.message
        // });
//        res.status(500).render('results', {mydata: err.message})
    });
};