const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');//connect to mlab database/ mongoDb Clusters
const cors = require('cors'); //allow cross-origin requests

const PORT = process.env.PORT || 4021;

const app = express();
app.listen(PORT,()=>{

	console.log("listening on port "+PORT);
})

app.use(cors());



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/RIDC',{useNewUrlParser: true })

mongoose.connection.once('open',() => {
	console.log('connected established');

});

app.use('/graphql',graphqlHTTP({
	schema,
	graphiql:true //to use graphiql tool in browser

}));
