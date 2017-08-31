var Feedly = require('feedly');
var http = require('http');
var path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'html')));

var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

var f = new Feedly({
  client_id: 'c3ee364d-9b0c-4e29-b070-b8984ca3bfec',
  client_secret: 'A0ruyr36E6a9JTNpRIMi6CF4aMEb8PcM-SLzLWlKhdLd2E0bfUN4hCbd1lpBX1mPQTQh9s9STRHqM9JW6u3FqYVr_WJPEplo25wPJgqVmO3933iVTXrnQUE_aclnxT7UhWIGkzFzUo_jKZR5Wiq2_UnrvFN2AHvCJ4R7wKkveirAO3EPrajru1Wwm8IJRn7zluXkxahGrD8hjjD9Ow59TuIMdfU4k8Jq-dLv799zpTbEbHgTIwXJ33w6S2XGODW8gAI:feedlydev',
  port: 8080
});

var now = Date.now();
var fourDays = 345600000;

app.get('/test', function (req, res) {
	var allResults = [];
	var count = 0;
	f.searchFeeds(req.query.q).then(function(sources) {
	 
	  sources.results.forEach(function(result) {
	  	
	  	f.contents(result.feedId).then(function(re) {
	  		
	  		allResults.push(re);
	  		count ++;

	  		if(count === sources.results.length) {

	  			var allItems = [];

					allResults.forEach(function(source) {
						source.items.forEach(function(item) {
							if(item.published >= (now - fourDays)) {
								allItems.push(item);
							}
						})
					})
					allItems.sort(function(a, b) {return a.published - b.published}).reverse();
	  			res.send(allItems);
	  		}
	  	}, function (error) {
	    	console.log(error)
			})
	  })  
	},
	function (error) {
	    console.log(error)
	});
})

app.listen(7000, function () {
  console.log('Example app listening on port 7000!')
})
