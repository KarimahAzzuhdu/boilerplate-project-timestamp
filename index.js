// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

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

app.get("/api/:date?", (req, res) => {
  let inputDate = req.params.date; 
  let convertDate;

  //FCC test 2,3,4. if inputDate unix key (Number type), convert
  //FCC test 5,7,8. if inputDate empty, current date (new Date)
  if (!inputDate){ //inputDate empty
    convertDate = new Date();
  } else if (!isNaN(inputDate)){ //inputDate not Number
    convertDate = new Date( parseInt(inputDate) );
  } else { //inputDate unix key
    convertDate = new Date( inputDate);
  }

  let unixDate = convertDate.getTime()
  let utcDate = convertDate.toUTCString();

  //FCC test 6. if inputDate invalid, error
  if (convertDate.toString() === "Invalid Date"){
    return res.json({ error : "Invalid Date" })
  } else {
    res.json({
      unix: unixDate,
      utc: utcDate
    });
  }
});

/** FCC test 1. URL project
 * http://localhost:3000/api/1451001600000
 */

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
