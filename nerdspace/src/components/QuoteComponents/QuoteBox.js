import React from "react";
import QuoteAndAuthor from "./QuoteAndAuthor";
import "./QuoteBox.css";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

/**
 * QuoteBox handles the quote button click and 
 * fetches a random quote from random quote generator API
 */

const config = {
    apiUrl: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
}

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quoteData: [],
            quote: '',
            author: ''
        }
        this.randomQuote = this.randomQuote.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        fetch(config.apiUrl)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    quoteData: data.quotes
                }, () => {
                    // Generates a random quote on initial load
                    this.handleClick();
                })
            })
            .catch(error => console.log('Error', error));
    }

    randomQuote() {
        const randomNumber = Math.floor(Math.random() * this.state.quoteData.length);
        return this.state.quoteData[randomNumber];
    }

    handleClick() {
        const newQuote = this.randomQuote();
        this.setState({
            quote: newQuote.quote,
            author: newQuote.author
        })
    }

    randomColor() {
        const color = `rgb(
            ${Math.floor(Math.random() * 155)},
            ${Math.floor(Math.random() * 155)},
            ${Math.floor(Math.random() * 155)})`;
        return color;
    }

    render() {
        return (
            <div>
                <QuoteAndAuthor
                    displayColor={this.randomColor}
                    handleClick={this.handleClick}
                    {...this.state}
                />
            </div>
        )
    }
}

export default QuoteBox;
