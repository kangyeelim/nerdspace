import React from "react";
import QuoteAndAuthor from "./QuoteAndAuthor";
import quotes from "./QuoteDatabase";
import "./QuoteBox.css";

/**
 * QuoteBox handles the quote button click and 
 * randomizes the quotes from QuoteDatabase and the colours displayed
 */

class QuoteBox extends React.Component {
    constructor() {
        super();
        this.state = {
            quote: quotes[0].quote,
            author: quotes[0].author,
        };
    }

    componentDidMount() {
        const newQuote = this.randomQuote();
        this.setState({
            quote: newQuote.quote,
            author: newQuote.author,
        });
        this.shuffleQuotes(quotes);
    }

    randomQuote() {
        const randomNumber = Math.floor(Math.random() * quotes.length);
        return quotes[randomNumber];
    }

    shuffleQuotes(array) {
        return array.sort(() => Math.random() - 0.5)
    }

    handleClick = () => {
        const newQuote = this.randomQuote();
        this.setState({
            quote: newQuote.quote,
            author: newQuote.author
        });
        this.shuffleQuotes(quotes)
    };

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
        );
    }
}

export default QuoteBox;
