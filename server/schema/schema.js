const graphql = require('graphql');
const _ = require('lodash')
const { GraphQLObjectType , GraphQLString , GraphQLSchema,GraphQLID} = graphql;

//test data

var books=[
    {name:'book1', genre:'fifa', id:'1'},
    {name:'book2', genre:'pes', id:'2'},
    {name:'book3', genre:'fifa', id:'3'},
]
const BookType = new GraphQLObjectType({
    name:'Book',
    fields: ()=>({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        genre: {type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(books,{id:args.id})
            }
        }
    }
});

module.exports= new GraphQLSchema({
    query: RootQuery
})
