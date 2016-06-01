var express = require('express');
var app = express();

app.get('/seikkor/photos', (req, res) => {
	res.send("seikkor!!");
});

app.listen(3000, () => {
	console.log("Seikkor listening on 3000...");
});