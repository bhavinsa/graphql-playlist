import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery, addAuthorMutation } from '../queries/queries';

class AddAuthor extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            age: 0
        };
    }

    submitForm(e){
        e.preventDefault()
        if (this.state.name !== "" && this.state.age !== 0 && this.state.age > 0) {
            this.props.addAuthorMutation({
                variables: {
                    name: this.state.name,
                    age: this.state.age,
                },
                refetchQueries: [{
                    query: getAuthorsQuery
                }]
            });
        } else {
            alert("Please enter valid author's name or author's age.");
        }
    }
    render(){
        return(
            <form id="add-author" onSubmit={ this.submitForm.bind(this) } >

                <div className="field">
                    <label></label>
                    <h2> <u>Add Author </u></h2>
                </div>
                <div className="field">
                    <label>Author name:</label>
                    <input type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </div>

                <div className="field">
                    <label>Author Age:</label>
                    <input type="number" onChange={ (e) => this.setState({ age: e.target.value }) } />
                </div>

                <div className="field">
                <label></label>
                <input type="submit" value="Add Author"/ >
                </div>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
    graphql(addAuthorMutation, { name: "addAuthorMutation" })
)(AddAuthor);
