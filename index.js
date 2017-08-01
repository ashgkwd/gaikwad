var express = require('express');
var fs = require('fs');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/receive/v1', function(request, respond) {
	var body = '';
	filePath = __dirname + '/public/output.txt';
	request.on('data', function(data) {
		body += data;
	});

	request.on('end', function (){
		fs.appendFile(filePath, body, function() {
			respond.send({
				adc: 420,
				full: 20.43,
				empty: 0.56,
				mcl: 1.20,
				lbc: 0.232,
				pi: 60*24,
				api: "http://ash.gaikwad.rocks/receive/v1",
				vid: "1.1.2"
			});
			respond.end();
		});
	});
});

app.get('/', function(request, response) {
	try {
		response.render('pages/index', {
			data: require('./data/'+request.get('host').split(':').shift()+'.json')
		});
	} catch (e) {
		response.render('pages/index', {
			data: require('./data/ashish.json')
		})
	}
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


