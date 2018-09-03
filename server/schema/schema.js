const graphql = require('graphql');
const _ = require('lodash')
const { GraphQLObjectType ,
     GraphQLString ,
      GraphQLSchema,
      GraphQLID,
      GraphQLInt,
      GraphQLList
    } = graphql;

//test data

var books=[
    {name:'book1', genre:'fifa', id:'1',authorid:'1'},
    {name:'book2', genre:'pes', id:'2',authorid:'2'},
    {name:'book3', genre:'fifa', id:'3',authorid:'3'},
    {name:'book4', genre:'fifa', id:'4',authorid:'2'},
    {name:'book5', genre:'pes', id:'5',authorid:'3'},
    {name:'book6', genre:'fifa', id:'6',authorid:'3'},
]
var authors=[
    {name:'charlie adams', age: 22, id:'1'},
    {name:'john cenna', age: 34, id:'2'},
    {name:'kylie lewis', age: 65, id:'3'},
]


const BookType = new GraphQLObjectType({
    name:'Book',
    fields: ()=>({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        genre: {type:GraphQLString},
        author:{
            type:Authortype,
            resolve(parent,args){
                return _.find(authors,{id:parent.authorid})
            }
        }
    })
})
const Authortype = new GraphQLObjectType({
    name:'Author',
    fields: ()=>({
        id: {type:GraphQLID},
        name: {type:GraphQLString},
        age: {type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorid:parent.id})
            }
        }
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
        },
        author:{
            type:Authortype,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }

        },
        authors:{
            type:new GraphQLList(Authortype),
            resolve(parent,args){
                return authors
            }

        }
    }
});

module.exports= new GraphQLSchema({
    query: RootQuery
})
