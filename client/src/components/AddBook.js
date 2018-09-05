import React, { Component } from 'react';

import { graphql,compose } from 'react-apollo';

import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/Queries';

class AddBook extends Component {

    state= {
        name:'',
        genre:'',
        authorid:''
    }
      
    submitForm = (e) => {
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorid:this.state.authorid,
            },
        refetchQueries:[{query:getBooksQuery}]
        })
    }

    displayAuthors=(data)=>(
     
     data.loading ? 
        <option>Loading ...</option>
     :
        data.authors.map(author=>(
            
               
                  <option key={author.id} value={author.id} >{author.name}</option>
            
        ))

    )
    render() {
        let data = this.props.getAuthorsQuery;

        return (
            <form id="add-book" onSubmit={this.submitForm}>
                <div className="field">
                    <label>book name :</label>
                    <input type="text"
                           onChange={(e)=>{this.setState({
                               name:e.target.value
                           })}}
                    />
                </div>

                    <div className="field">
                    <label>genre :</label>
                    <input type="text"
                            onChange={(e)=>{this.setState({
                            genre:e.target.value
                                   })}}
                    />
                </div>

                    <div className="field">
                    <label>author : </label>
                    <select onChange={(e)=>{this.setState({
                            authorid:e.target.value
                                   })}}>
                        <option value="default">Select Author</option>
                        {this.displayAuthors(data)}
                    </select>
                    
                </div>
                <button>+</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery,{name:'getAuthorsQuery'}),
    graphql(addBookMutation,{name:'addBookMutation'}),
)(AddBook);
