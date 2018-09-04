import React, { Component } from 'react';

import {gql} from 'apollo-boost'
import { graphql } from 'react-apollo';

const getBookQuery = gql`
{
    books{
        name
        id
    }
}
`

class BookList extends Component {
      
    displayBooks=(data)=>(
     
     data.loading ? 
        <div>Loading ...</div>
     :
        data.books.map(book=>(
            
                <li key={book.id}>{book.name}</li>
            
        ))

    )
    render() {
        let { data }= this.props;
        return (
            <div>
                <ul id='book-list'>
                    {this.displayBooks(data)}
                </ul>
                
            </div>
        );
    }
}

export default graphql(getBookQuery)(BookList);
