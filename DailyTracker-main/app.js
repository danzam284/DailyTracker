const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mostRecentName = null;

app.use(express.static(__dirname+'/public'));


//Keeps signup form address
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
});

//switch from sign in to log in form
app.post('/water', (req, res) => {
    return res.redirect(__dirname + '/water.html');
})

//switch from sign in to log in form
app.post('/worry', (req, res) => {
    return res.redirect(__dirname + '/worry.html');
})

//switch from sign in to log in form
app.post('/sleep', (req, res) => {
    return res.redirect(__dirname + '/sleep.html');
})

//switch from sign in to log in form
app.post('/frog', (req, res) => {
    return res.redirect(__dirname + '/frog.html');
})

//switch from sign in to log in form
app.post('/nutrition', (req, res) => {
    return res.redirect(__dirname + '/nutrition.html');
})

//Keeps signup form address
app.get(__dirname + '/water.html', (req, res) => {
    res.sendFile(__dirname + '/water.html');
});

//Keeps signup form address
app.get(__dirname + '/worry.html', (req, res) => {
    res.sendFile(__dirname + '/worry.html');
});

//Keeps signup form address
app.get(__dirname + '/sleep.html', (req, res) => {
    res.sendFile(__dirname + '/sleep.html');
});

app.get(__dirname + '/frog.html', (req, res) => {
    res.sendFile(__dirname + '/frog.html');
});

//switch from sign in to log in form
app.post('/signup', (req, res) => {
    return res.redirect(__dirname + '/login.html');
})

app.post('/form', (req, res) => {
    return res.redirect(__dirname + '/index.html');
})

//sends txt to client html
app.post('/getUsers', (req, res) => {
    res.status(200).sendFile(__dirname + '/users.txt');
});

app.post('/signup.html', urlencodedParser, (req, res) => {
    res.redirect(__dirname + '/login.html');
    let email = req.body.email;
    let name = req.body.name;
    let password = req.body.password;
    let s = "";
    s += email + '\n';
    s += name + '\n';
    s += password + '\n';
    fs.appendFile(__dirname + '/users.txt', s, function(e) {
        if (e) {
            return console.log(e);
        }
    });
    return res.end();
})

app.post('/home', urlencodedParser, (req, res) => {
    res.redirect(__dirname + '/homescreen.html');
})

app.post('/login.html', urlencodedParser, async (req, res) => {
    res.redirect(__dirname + '/homescreen.html');
    var data = await fs.readFile(__dirname + "/users.txt", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        return data;
    });

    let email = req.body.email;

    data = data.split('\n');
    for (let i = 0; i < data.length; i += 3) {
        if (data[i] == email) {
            mostRecentName = data[i + 1];
            break;
        }
    }

    let row = '*' + mostRecentName + ', ' + email + '\n';

    fs.appendFile(__dirname + '/mem.txt', row, function(e) {
        if (e) {
            return console.log(e);
        }
    });
    await parseData();
    return res.end(); 
});

//Keeps login form address
app.get(__dirname + '/login.html', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

//keeps form address
app.get(__dirname + '/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//keeps form address
app.get(__dirname + '/nutrition.html', (req, res) => {
    res.sendFile(__dirname + '/nutrition.html');
});

app.get(__dirname + '/easter.html', (req, res) => {
    res.sendFile(__dirname + '/easter.html');
});

//Runs when form is submitted
app.post('/index.html', urlencodedParser, (req, res) => {
    res.redirect(__dirname + '/team.html');
    fs.appendFile(__dirname + '/mem.txt',req.body.day + ', ' + req.body.water + ', ' +  req.body.hard + ', ' + req.body.sleep + ', ' + req.body.worry + ', ' + req.body.food + '\n', function(e) {
        if (e) {
            return console.log(e);
        }
    });
    res.end();
});

app.post('/waterPosted', urlencodedParser, (req, res) => {
    fs.appendFile(__dirname + '/mem.txt',req.body.day + ', ' + req.body.water + ', ' +  ', ' +  ', ' +  ', ' + '\n', function(e) {
        if (e) {
            return console.log(e);
        }
    });
    res.status(204).send();
})

app.post('/sleepPosted', urlencodedParser, (req, res) => {
    fs.appendFile(__dirname + '/mem.txt',req.body.day + ', ' + ', ' +  ', ' + req.body.sleep + ', ' +  ', ' + '\n', function(e) {
        if (e) {
            return console.log(e);
        }
    });
    res.status(204).send();
})

app.post('/easter', urlencodedParser, (req, res) => {
    res.redirect(__dirname + "/easter.html");
})

app.post('/worryPosted', urlencodedParser, (req, res) => {
    fs.appendFile(__dirname + '/mem.txt',req.body.day + ', ' + ', ' +  ', ' +  ', ' + req.body.worry +  ', ' + '\n', function(e) {
        if (e) {
            return console.log(e);
        }
    });
    res.status(204).send();
})

app.post('/nutritionPosted', urlencodedParser, (req, res) => {
    fs.appendFile(__dirname + '/mem.txt',req.body.day + ', '  + ', ' +  ', ' +  ', ' +  ', ' + req.body.num + '\n', function(e) {
        if (e) {
            return console.log(e);
        }
    });
    res.status(204).send();
})

app.post('/frogPosted', urlencodedParser, (req, res) => {
    fs.appendFile(__dirname + '/mem.txt',req.body.day + ', ' + ', ' + req.body.frogTime +  ', ' +  ', ' +  ', ' + '\n', function(e) {
        if (e) {
            return console.log(e);
        }
    });
    res.status(204).send();
})

//when skip button clicked
app.post('/skip', urlencodedParser = async function(req, res) {
    await parseData();
    return res.redirect(__dirname + '/team.html');
});

//keeps homepage address
app.get(__dirname + '/homescreen.html', (req, res) => {
    res.sendFile(__dirname + '/homescreen.html');
});

//keeps team address
app.get(__dirname + '/team.html', (req, res) => {
    res.sendFile(__dirname + '/team.html');
});

//sends csv to client html
app.post('/getCsv', (req, res) => {
    res.status(200).sendFile(__dirname + '/data.csv');
});

//sends txt to client html
app.post('/getdata', (req, res) => {
    res.status(200).sendFile(__dirname + '/mem.txt');
});

//sends most recent name to client side
app.post('/getName', (req, res) => {
    res.status(200).send(mostRecentName);
});

app.post("/team", urlencodedParser = async function(req, res) {
    await parseData();
    res.redirect(__dirname + '/team.html')
})

//converts txt data into a csv file based on last user
async function parseData() {
    csv = await findCommon();

    fs.writeFile(__dirname + '/data.csv', csv, function(e) {
        if (e) {
            return console.log(e);
        }
    });
}

async function findCommon() {
    var csv = "date, water, hard, sleep, worry, food\n";
    var data = await fs.readFile(__dirname + "/mem.txt", 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        return data;
    });


    for (let i = 0; i < data.length; i++) {
        if (data[i] === '*' && i + mostRecentName.length < data.length) {
            let curr = "";
            if (data.slice(i + 1, i + mostRecentName.length + 1) == mostRecentName) {
                while (data[i] != '\n') {
                    i++;
                }
                if (i < data.length - 1) {
                    i += 1
                }
                if (data[i] != '*') {
                    while (data[i] != '\n') {
                        curr += data[i];
                        i += 1;
                    }
                    curr += data[i];
                }
            }
            csv += curr;
        }
    }
    return csv;
}

app.listen(process.env.PORT || 3000); //keeps running on port 3000