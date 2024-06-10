// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date_string?", function(req, res){
  var response,
    date,
    unix_dt,
    utc_dt;

  // If :date_string is empty, return current time
  if (!req.params.date_string) {
    unix_dt = Date.now()
    utc_dt = new Date(unix_dt).toUTCString();
    response = ({ unix: unix_dt, utc: utc_dt });
  } else {
    // If :date_string is valid date, return UTC date and Unix timestamp in milliseconds
    if (Number(req.params.date_string)) {
      // UNIX input
      date = new Date(Number(req.params.date_string));
    } else {
      // UTC input
      date = new Date(req.params.date_string);
    }

    if (!isNaN(date)) {
      unix_dt = date.getTime();
      utc_dt = date.toUTCString();
      response = ({ unix: unix_dt, utc: utc_dt });
    } else {
      // If :date_string is invalid, return error
      response = ({ error: "Invalid Date" })
    }
  }
  res.json(response);
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
