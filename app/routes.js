
var https = require('https');

var passport = require('./passport');

var Reservation = require('./models/Reservation');

module.exports = function(app){

    app.post('/login', 
        passport.authenticate('local'),
        function(req, res, next){
            res.json({aa:'f'});
/*
        var output = {
            data: [],
            reserve: []
        };

        var staff = {
            username: req.body.username,
            password: req.body.password
        };
        var socket = https.request({
            hostname: 'hotels.cloudbeds.com',
            path: '/api/v1.1/access_token',
            method: 'POST'
        }, function(data){
            data.setEncoding('utf8');
            data.on('data', function(chunk){
                output.data.push(JSON.parse(chunk));
            });
            data.on('end', function(){
                res.json(output);
            });
        });
        socket.end(JSON.stringify({
            grant_type: 'password',
            client_id: 'client_id',
            client_secret: 'client_secret',
            username: staff.username,
            password: staff.password
        }));

        Reservation.find(function(error, reservations){
            if(error) res.send(error);
            output.reserve = reservations;
        });
*/
    });
    
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html');
    });

};