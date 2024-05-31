const mongoose = require('mongoose');
const Report = mongoose.model('Report');

const search = {
    search: (req, res) => {
        //display search page
        res.render('search');
    },

    addReports: async (req, res) => {
        if (req.body) {
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const areaCode = req.body.areaCode;
            const exchange = req.body.exchange;
            const extension = req.body.extension;
            if (req.session.user) {
                // if user is logged in, display results that have been searched
                const reports = await Report.find({ firstName, lastName}).lean();
                res.render('search', { reports });
            } else {
                // if user is not logged in, display results that have been searched
                const reports = await Report.find({ firstName, lastName }).lean();
                res.render('search', { reports });
            }  
        }
    }

};

module.exports = search;