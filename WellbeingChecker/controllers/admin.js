const admin = {
    admin: (req, res) => {
        res.render('dashboard');
    },

    detail: (req, res) => {
        res.render('detail');
    }
}
module.exports = admin;