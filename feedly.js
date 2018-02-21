var Feedly = require('feedly');
var http = require('http');
var path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'html')));

var f = new Feedly({
  client_id: 'c3ee364d-9b0c-4e29-b070-b8984ca3bfec',
  client_secret: 'A1AnrsRhydHeyZbiNrX-nCQnV2jRUnOlKI_QkOqaxipTxZP5fbShWU_S7BfE-9j8hMk2FnIhia69sMqwqTXFjg312HM_ZOcV5G-aHNR56hZUKio5YJlNDq1jIfxlir2o1VeCHI2lmDG6_TuFJvTQkvxqrnfcHDmMFedCwXSBtyasl76nX0_h8_bnS1usRgqegMmK-ICDyz7P8C5RnrZpoRi1qBJsPXzamHtp48wxOOqpAC-LBD4ena18n8L5RVXrEvasaZgscVChWqtwgd2McozTVVVMR1uMWg:feedlydev',
  port: 8080
});

var now = Date.now();
var fourDays = 345600000;

app.get('/test', function (req, res) {
	
	f.contents(req.query.q).then(function(resp) {
		
		var allItems = [];
		resp.items.forEach(function(item) {
			if(item.published >= (now - fourDays)) {
				allItems.push(item);
			}
		});

		allItems.sort(function(a, b) {return a.published - b.published}).reverse();
		res.send(allItems);
	}, 
	function (error) {
  	console.log(error)
	}); 
},
function (error) {
  console.log(error)
});

app.listen(7000, function () {
  console.log('Example app listening on port 7000!')
})
