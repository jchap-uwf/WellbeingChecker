const mongoose = require('mongoose');
const Report = mongoose.model('Report');

const main = {
    root: (req, res) => {
        res.render('home');
    },

    report: async (req, res) => {
        if (req.session.user) {
            //use user info to look up their reports
            const reports = await Report.find({username: req.session.user.username}).lean();
            console.log({reports});
            res.render('home', { reports });
        }
    }
};

module.exports = main;