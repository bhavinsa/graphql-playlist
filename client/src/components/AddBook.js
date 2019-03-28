import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            genre: '',
            authorId: ''
        };
    }
    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return( <option disabled>Loading authors</option> );
        } else {
            return data.authors.map(author => {
                return( <option key={ author.id } value={author.id}>{ author.name }</option> );
            });
        }
    }
    submitForm(e){
        e.preventDefault()
        // use the addBookMutation
        if(this.state.authorId !== "" && this.state.authorId !== "0"){
            this.props.addBookMutation({
                variables: {
                    name: this.state.name,
                    genre: this.state.genre,
                    authorId: this.state.authorId
                },
                refetchQueries: [{ query: getBooksQuery }]
            });
        }else{
            alert("Please select author.");
        }
     
    }
    render(){
        return(
            <form id="add-book" onSubmit={ this.submitForm.bind(this) } >

                <div className="field">
                    <label></label>
                    <h2> <u>Add Book </u></h2>
                </div>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={ (e) => this.setState({ genre: e.target.value }) } />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={ (e) => this.setState({ authorId: e.target.value }) } >
                        <option key="0" value="0" >Select author</option>
                        { this.displayAuthors() }
                    </select>
                </div>
                <div className="field">
                <label></label>
                <input type="submit" value="Add Book"/ >
                </div>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
