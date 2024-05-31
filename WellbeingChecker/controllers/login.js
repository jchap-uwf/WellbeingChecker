const mongoose = require('mongoose');
const User = mongoose.model('User');

//Bcrypt
const bCrypt = require('bcrypt');

const login = {
    login: (req, res) => {
        res.render('login');
    },

    processLogin: async (req, res) => {
       
        if (req.body && req.body.username && req.body.password){
            const username = req.body.username;
            const password = req.body.password;
            
        //Query DB for username and password
        const user = await User.findOne({username: username}).lean();    
        if(user && user.password){
            bCrypt.compare(password, user.password, (err, passwordMatch) => {
                if (passwordMatch) {
                    req.session.user = user;
                    res.redirect('report');
                    // console.log('yes match');
                } else {
                    // console.log("no match");
                }
            });
        }else{
            req.session.flash = {
                type: "danger",
                intro: "Login failed",
                message: "Login credentials are incorrect"
            };
            res.redirect('/');
        }
        }else{
            console.error('No username or password found');
        }
    },

    processLogout: (req, res) => {
        if(req.session && req.session.user){
            delete req.session.user;
        }

        req.session.flash = {
            type: "success",
            intro: "you're logged out",
            message: "you have been logged out"
        };

        res.redirect('/');
    }

};

module.exports = login;