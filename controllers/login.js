module.exports = function(info) {
    return function(req, res){
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            var data = {
                title: "Login",
                name: info.name,
                version: info.version
            };
            res.render("login", data);
        }
    }
}
