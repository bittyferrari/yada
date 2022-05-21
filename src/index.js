const express = require('express');
// var cors = require('cors');

import routerPrerender from './router/prerender';

const app = express();

// app.set('trust proxy', true);
// app.use(cors());

// frontend
app.use('/prerender', routerPrerender);

// for testing
app.get('/test', (req, res) => {
	const result = { test: 'yada' };
	res.json(result);
});

// 404
app.get('*', function (req, res) {
	res.status(404).send('404 yada');
});

app.use(function (error, req, res, next) {
	res.status(error.status || 500);
	next(error);
});

console.log('running on ' + process.env.HOST + ':' + process.env.PORT);

app.listen(process.env.PORT, process.env.HOST);
