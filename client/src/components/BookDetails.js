import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import {getBookQuery} from '../queries/Queries';

class BookDetails extends Component {

      displayBookDetails=(book)=>(

        book ? 
           <div>
               <h2>Book Name :{book.name}</h2>
               <p> Book Genre:{book.genre}</p>
               <p> Book Author:{book.author.name}</p>
               <p>All Books by this author</p>
               <ul className="other-books">
                  {book.author.books.map(book=>{
                      return <li key={book.id}>{book.name}</li>
                  })}
               </ul>
           </div> 
        :
        <p>Select a Book</p>

                )
    render() {
        const {book} = this.props.data;
        console.log(book)
        return (
            <div id="book-details">
              {this.displayBookDetails(book)}
            </div>
        );
    }
}

export default graphql(getBookQuery,{
    options:(props)=>{
        return{
            variables: {
                id:props.bookId
            }
        }
    }
})(BookDetails);
