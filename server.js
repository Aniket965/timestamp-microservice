var express = require("express");
var app = express();
app.set('port', (process.env.PORT || 2000));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/:date', function (req, res) {
    var date
    var time = req.params.date

    var schema = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    if (new Date(time).getTime()) {
        date = new Date(time);
    } else if (new Date(Number(time)).getTime()) {
        date = new Date(Number(time));
    } else {
        date = null;
    }


    var json = date ? {
        'unix': date.getTime(),
        'natural': date.toLocaleDateString("en-US", schema)
    } : {
        'unix': null,
        'natural': null
    };
    res.send(JSON.stringify(json));

});
app.listen(app.get('port'), function () {
    console.log('running on 2000');
});