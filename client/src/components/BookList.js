import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import {getBooksQuery} from '../queries/Queries';
import BookDetails from './BookDetails'

class BookList extends Component {

    state={
        selected:null
    }

    displayBooks=(data)=>(
     
     data.loading ? 
        <div>Loading ...</div>
     :
        data.books.map(book=>(
            
                <li key={book.id} onClick={(e)=>{this.setState({
                                                        selected:book.id
                })}}>{book.name}</li>

        ))

    )
    render() {
        let { data }= this.props;
        return (
            <div>
                <ul id='book-list'>
                    {this.displayBooks(data)}
                </ul>
            <BookDetails bookId={this.state.selected}/>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
