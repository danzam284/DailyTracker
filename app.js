const express = require("express");
const fs = require("fs").promises;
const bodyParser = require("body-parser");
const app = express();
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'streaktracker.lifehikes@gmail.com',
      pass: 'jyphwqrkliqzwrge'
    }
});


var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mostRecentName = null;
var mostRecentEmail = null;
var emailSent = false;
var currentStreak = 1;
var maxStreak = 1;

app.use(express.static(__dirname + "/public"));

//Keeps signup form address
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

//switch from sign in to log in form
app.post("/water", (req, res) => {
  return res.redirect(__dirname + "/water.html");
});

//switch from sign in to log in form
app.post("/worry", (req, res) => {
  return res.redirect(__dirname + "/worry.html");
});

//switch from sign in to log in form
app.post("/sleep", (req, res) => {
  return res.redirect(__dirname + "/sleep.html");
});

//switch from sign in to log in form
app.post("/frog", (req, res) => {
  return res.redirect(__dirname + "/frog.html");
});

//switch from sign in to log in form
app.post("/nutrition", (req, res) => {
  return res.redirect(__dirname + "/nutrition.html");
});

app.post("/movement", (req, res) => {
  return res.redirect(__dirname + "/movement.html");
});

//Keeps signup form address
app.get(__dirname + "/water.html", (req, res) => {
  res.sendFile(__dirname + "/water.html");
});

//Keeps signup form address
app.get(__dirname + "/worry.html", (req, res) => {
  res.sendFile(__dirname + "/worry.html");
});

//Keeps signup form address
app.get(__dirname + "/sleep.html", (req, res) => {
  res.sendFile(__dirname + "/sleep.html");
});

app.get(__dirname + "/frog.html", (req, res) => {
  res.sendFile(__dirname + "/frog.html");
});

//switch from sign in to log in form
app.post("/signup", (req, res) => {
  return res.redirect(__dirname + "/login.html");
});

app.post("/form", (req, res) => {
  return res.redirect(__dirname + "/index.html");
});

//sends txt to client html
app.post("/getUsers", (req, res) => {
  res.status(200).sendFile(__dirname + "/users.txt");
});

app.post("/getMaxAndMin", (req, res) => {
  res.status(200).send(currentStreak + " " + maxStreak);
});

app.post("/signup.html", urlencodedParser, (req, res) => {
  res.redirect(__dirname + "/login.html");
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;
  let s = "";
  s += email + "\n";
  s += name + "\n";
  s += password + "\n";
  fs.appendFile(__dirname + "/users.txt", s, function (e) {
    if (e) {
      return console.log(e);
    }
  });
  return res.end();
});


app.post("/home", urlencodedParser, (req, res) => {
  res.redirect(__dirname + "/homescreen.html");
});

app.post("/login.html", urlencodedParser, async (req, res) => {
    res.redirect(__dirname + "/homescreen.html");
  var data = await fs.readFile(__dirname + "/users.txt","utf8",(err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      return data;
    }
  );

  let email = req.body.email;
  mostRecentEmail = email;
  data = data.split("\n");
  for (let i = 0; i < data.length; i += 3) {
    if (data[i] == email) {
      mostRecentName = data[i + 1];
      break;
    }
  }

  let row = "*" + mostRecentName + ", " + email + "\n";

  await fs.appendFile(__dirname + "/mem.txt", row, function (e) {
    if (e) {
      return console.log(e);
    }
  });
  await parseData();
  //await sleep(1000);
  res.end();
});

//Keeps login form address
app.get(__dirname + "/login.html", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

//keeps form address
app.get(__dirname + "/index.html", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//keeps form address
app.get(__dirname + "/nutrition.html", (req, res) => {
  res.sendFile(__dirname + "/nutrition.html");
});

//keeps form address
app.get(__dirname + "/movement.html", (req, res) => {
  res.sendFile(__dirname + "/movement.html");
});

app.get(__dirname + "/easter.html", (req, res) => {
  res.sendFile(__dirname + "/easter.html");
});


//Runs when form is submitted
app.post("/index.html", urlencodedParser, (req, res) => {
  res.redirect(__dirname + "/team.html");
  fs.appendFile(
    __dirname + "/mem.txt",
    req.body.day +
      ", " +
      req.body.water +
      ", " +
      req.body.hard +
      ", " +
      req.body.sleep +
      ", " +
      req.body.worry +
      ", " +
      req.body.food +
      "\n",
    function (e) {
      if (e) {
        return console.log(e);
      }
    }
  );
  res.end();
});

app.post("/waterPosted", urlencodedParser, (req, res) => {
  fs.appendFile(
    __dirname + "/mem.txt",
    req.body.day + ", " + req.body.water + ", " + ", " + ", " + ", " + ", " + "\n",
    function (e) {
      if (e) {
        return console.log(e);
      }
    }
  );
  res.status(204).send();
});

app.post("/movementPosted", urlencodedParser, (req, res) => {
  fs.appendFile(
    __dirname + "/mem.txt",
     req.body.day + ", " + ", " + ", " + ", " + ", " + ", " + req.body.movement + "\n",
    function (e) {
      if (e) {
        return console.log(e);
      }
    }
  );
  res.status(204).send();
});

app.post("/sleepPosted", urlencodedParser, (req, res) => {
  fs.appendFile(
    __dirname + "/mem.txt",
    req.body.day + ", " + ", " + ", " + req.body.sleep + ", " + ", " + ", " + "\n",
    function (e) {
      if (e) {
        return console.log(e);
      }
    }
  );
  res.status(204).send();
});

app.post("/easter", urlencodedParser, (req, res) => {
  res.redirect(__dirname + "/easter.html");
});

app.post("/worryPosted", urlencodedParser, (req, res) => {
  fs.appendFile(
    __dirname + "/mem.txt",
    req.body.day + ", " + ", " + ", " + ", " + req.body.worry + ", " + ", " + "\n",
    function (e) {
      if (e) {
        return console.log(e);
      }
    }
  );
  res.status(204).send();
});

app.post("/nutritionPosted", urlencodedParser, (req, res) => {
  fs.appendFile(
    __dirname + "/mem.txt",
    req.body.day + ", " + ", " + ", " + ", " + ", " + req.body.num + ", " + "\n",
    function (e) {
      if (e) {
        return console.log(e);
      }
    }
  );
  res.status(204).send();
});

app.post("/frogPosted", urlencodedParser, (req, res) => {
  fs.appendFile(
    __dirname + "/mem.txt",
    req.body.day + ", " + ", " + req.body.frogTime + ", " + ", " + ", " + ", " + "\n",
    function (e) {
      if (e) {
        return console.log(e);
      }
    }
  );
  res.status(204).send();
});

//when skip button clicked
app.post(
  "/skip",
  (urlencodedParser = async function (req, res) {
    return res.redirect(__dirname + "/team.html");
  })
);

//keeps homepage address
app.get(__dirname + "/homescreen.html", (req, res) => {
  res.sendFile(__dirname + "/homescreen.html");
});

//keeps team address
app.get(__dirname + "/team.html", (req, res) => {
  res.sendFile(__dirname + "/team.html");
});

//sends csv to client html
app.post("/getCsv", (req, res) => {
  res.status(200).sendFile(__dirname + "/data.csv");
});

//sends txt to client html
app.post("/getdata", (req, res) => {
  res.status(200).sendFile(__dirname + "/mem.txt");
});

//sends most recent name to client side
app.post("/getName", (req, res) => {
  res.status(200).send(mostRecentName);
});

app.post("/team", (urlencodedParser = async function (req, res) {
    new Promise((resolve, reject) => {
        parseData().then(() => {
            res.redirect(__dirname + "/team.html")
        });
        resolve();
    })
  })
);

//converts txt data into a csv file based on last user
async function parseData() {
  let dates = await findCommon();
  let currStreak = await getMaxStreak(dates);
/*
  var mailOptions = {
          from:'streaktracker.lifehikes@gmail.com',
          to:mostRecentEmail,
          subject: currStreak + ' days in a row! You are KILLING it ' + mostRecentName + '!',
          text:'Hello here from the Life Hikes Product Technology Summer Fellows!\nWe just wanted to congratulate you on logging in ' + currStreak + " days in a row! Keep up the great work " + mostRecentName + "!\n\nBest,\nYour friends at LifeHikes"
        }
  transporter.sendMail(mailOptions, function(e, info) {
    if (e) {
        console.log(e);
    } else {
        console.log("email sent: " + info.response);
    }
  })
  */

}

async function getMaxStreak(dates) {
  let found = false;
  let today = new Date();
  let year = today.getFullYear().toString();
  let month = (today.getMonth() + 1).toString();
  let day = today.getDate().toString();

  if (month.length == 1) {
    month = "0" + month;
  }
  if (day.length == 1) {
    day = "0" + day;
  }

  let testDate = year + "-" + month + "-"+ day;

  if (!(testDate in dates)) {
    dates.push(testDate);
  }
  dates = Array.from(new Set(dates));
  let streak = 1;
  for (let i = dates.length - 1; i > 0; i--) {
    let options;
    if (i == dates.length - 1) {
        options = convert(testDate);
    } else {
        options = convert(dates[i]);
    }
    if (dates[i - 1] == options[0] || dates[i - 1] == options[1] || dates[i - 1] == options[2]) {
      streak++;
    } else {
      if (!found){
        found = true;
        currentStreak = streak;
      }
      maxStreak = Math.max(maxStreak, streak);
      streak = 1;
    }
  }
  if (!found){
    found = true;
    currentStreak = streak;
  }
  maxStreak = Math.max(maxStreak, streak);
  return currentStreak;
}

 function convert(date) {
  let option1Day = (parseInt(date.slice(8, 10)) - 1).toString();
  if (option1Day.length == 1) {
    option1Day = "0" + option1Day;
  }
  let option2Month = (parseInt(date.slice(5, 7)) - 1).toString();
  if (option2Month.length == 1) {
    option2Month = "0" + option2Month;
  }
  let option2Day = "30";
  let option3Day = "31";
  let option1 = date.slice(0, 8) + option1Day;
  let option2 = date.slice(0, 5) + option2Month + "-" + option2Day;
  let option3 = date.slice(0, 5) + option2Month + "-" + option3Day;
  return [option1, option2, option3];
}

async function after(d1, d2) {
  if (d1.slice(0, 4) > d2.slice(0, 4)) {
    return true;
  }
  if (d1.slice(5, 7) > d2.slice(5, 7)) {
    return true;
  }
  if (d1.slice(8, 10) > d2.slice(8, 10)) {
    return true;
  }
  return false;
}

async function bubbleSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      let comp = await after(arr[j], arr[j + 1]);
      if (comp) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

async function findCommon() {
  var dates = new Set();
  var data = await fs.readFile(__dirname + "/mem.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  });

  data = data.split('\n');
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "*" && mostRecentName.length < data[i].length) {
      if (data[i].slice(1, mostRecentName.length + 1) == mostRecentName) {
        if (i != data.length - 1) {
          i++;
        }
        while (data[i][0] != "*" && i < data.length - 1) {
          dates.add(data[i].slice(0, 10));
          i++;
        }
      }
    }
  }
  dates = Array.from(dates);
  dates = await bubbleSort(dates);
  return dates;
}

app.listen(2000);