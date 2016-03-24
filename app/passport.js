	
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

var Staff = require('./models/Staff');

passport.use('oauth2', 
	new OAuth2Strategy({
	    authorizationURL: 'https://hotels.cloudbeds.com/api/v1.1/access_token',
	    tokenURL: 'https://hotels.cloudbeds.com/api/v1.1/access_token',
	    client_id: '123-456-789',
	    client_secret: 'shhh-its-a-secret',
	    clientID: '123-456-789',
	    clientSecret: 'shhh-its-a-secret',
	    grant_type: 'password'
	},
	function(accessToken, refreshToken, profile, done) {
		console.log(accessToken);
		console.log(refreshToken);
		console.log(profile);

		done(accessToken);
	}
));

passport.use('local', new LocalStrategy(
	function(username, password, done){ 
	    Staff.findOne({ username: username }, function (err, staff){
			if(err) return done(err); 
			if(!staff) return done(null, false); 
			staff.comparePassword(password, function(error, isMatch){
				if(error) return done(error);
				if(isMatch) return done(null, staff);
				else return done(null, false);
			});
	    });
	}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;