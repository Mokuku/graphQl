const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose=require('mongoose');

const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/graphqldb')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}))

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));