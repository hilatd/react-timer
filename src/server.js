var express = require('express');
var querystring =require('querystring');
var app = express();

const router = express.Router();
app.use(express.static('dist')); 
var client_id = 'CLIENT_ID';
var redirect_uri = 'http://localhost:8888/callback';
const client_secret = '';
app.listen(8888, function() { console.log('Server running on port 8888'); });

app.get('/', function(req, res) {
    console.log(res);
});
app.get('/callback', function(req, res) {

    var code = req.query.code || null;
    var state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': `Basic ` + (`${client_id}:${client_secret}`).toString('base64')
        },
        json: true
      };
    }
  });

  app.get('/refresh_token', function(req, res) {

    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
    router.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });