const express = require('express');
const route = require('./router');

const app = express();

app.use('/seikkor', route);

app.listen(3000, () => {
	console.log("Seikkor API listening on 3000...");
});