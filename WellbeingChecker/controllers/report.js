const mongoose = require('mongoose');
const Disaster = mongoose.model('Disaster')
const Report = mongoose.model('Report');


const report = {
    report: async (req, res) => {
        const disaster = await Disaster.find().lean();
        res.render('report', {disasters: disaster} );
    },

    processReport: async (req, res) => {
        if(req.body.username != req.session.user.username){
            res.redirect('/report');
        }
        
        const report = {
            ...req.body,
            username: req.session.user.username
        };
        
        let newReport = new Report(report);
        try {
            await newReport.save();
        } catch (error) {
            console.error(err);
        }
        
    }
};

module.exports = report;