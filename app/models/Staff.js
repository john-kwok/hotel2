var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var schema = new Schema({
    staffId: String,
    username: String,
    password: String
});

schema.pre('save', function(next){
	var staff = this;

    if (!staff.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(staff.password, salt, function(err, hash) {
            if (err) return next(err);

            staff.password = hash;
            next();
        });
    });

});

schema.methods.comparePassword = function(pws, cb) {
    bcrypt.compare(pws, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Staff', schema);