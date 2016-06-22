import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';

const app = express();

db.setUpConnection();

app.use( bodyParser.json() );

app.use(cors({ origin: '*' }));

app.get('/products', (req, res) => {
    db.listProducts().then(data => res.send(data));
});

app.post('/products/new', (req, res) => {
    db.createProduct(req.body).then(data => res.send(data));
});

app.get('/products/:id', (req, res) => {
	db.getProduct(req.params.id).then(data => res.send(data));
	console.log(req.params.id);
});

app.post('/notes', (req, res) => {
    db.createProduct(req.body).then(data => res.send(data));
});


app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Отладочное, потом удалить! 
app.post('/user/new', (req, res) => {
    db.createUser(req.body).then(data => res.send(data));
});
app.get('/user', (req, res) => {
    db.listUsers().then(data => res.send(data));
});
app.get('/user/:id', (req, res) => {
	db.getUser(req.params.id).then(data => res.send(data));
	console.log(req.params.id);
});
app.get('/user/inbase/:email', (req, res) => {
	db.inBase(req.params.email).then(data => res.send(data));
	console.log(req.params.email);
});


app.post('/user/update', (req, res) => {
    db.updateUser(req.body).then(data => res.send(data));
});

	app.post('/user/likes/update', (req, res) => {
	    db.updateUserLikes(req.body).then(data => res.send(data));
	});

	app.post('/user/basket/update', (req, res) => {
	    db.updateUserBasket(req.body).then(data => res.send(data));
	});

	app.post('/user/access/update', (req, res) => {
	    db.updateUserAccess(req.body).then(data => res.send(data));
	});

app.post('/products/likes/inc', (req, res) => {
    db.ProductLikesInc(req.body).then(data => res.send(data));
});	

app.post('/products/likes/dec', (req, res) => {
    db.ProductLikesDec(req.body).then(data => res.send(data));
});	



const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});