var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

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


