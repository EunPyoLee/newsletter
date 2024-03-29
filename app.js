//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data={
    members: [
      {
        email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
    ]
  };
  var jsonData = JSON.stringify(data);

  var options = {
    //for security reason, mailchimp api keys and user information is deleted
  };
  request(options, function(error, response, body) {
    if(error){
      res.sendFile(__dirname + "/failure.html");
    }
    else{
      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    }

  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});


//process.env.PORT is what heroku places for dynamically located port
app.listen(process.env.PORT || 3000, function() {
  console.log("server is running on port 3000");
});

