var mongoose = require('mongoose');

module.exports = function(uri) {
    mongoose.connect(uri);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, "Connection error:"));
    db.on('open', function(){
        console.log("Connected to Mongo");
    });

    var schema = new mongoose.Schema({
        provider: String,
        id: String,
        displayName: String,
        name: { familyName: String, givenName: String, middleName: String },
        emails: [{ value: String }],
        photos: [{ value: String }]
    });
    schema.index({ id: 1 });

    return mongoose.model('userprofiles', schema);
}
