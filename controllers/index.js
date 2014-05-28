module.exports = function(info) {
    return function(req, res){
        var data = {
            title: "NodeJS Boilerplate",
            name: info.name,
            version: info.version
        };

        if (req.isAuthenticated()) {
            data.user = req.user
        }

        res.render("index", data);
    }
}
