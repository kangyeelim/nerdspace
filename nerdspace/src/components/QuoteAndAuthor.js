import React from "react";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

/**
 * QuoteAndAuthor renders the quote contents in a Card for display
 */

class QuoteAndAuthor extends React.Component {
    render() {
        const randomColor = this.props.displayColor();
        const html = document.documentElement;
        html.style.backgroundCOlor = randomColor;
    
        return (
            <Card style={{ backgroundColor: "white" }} className="quoteBox">
                <CardContent>
                <div
                    className="fadeIn"
                    key={Math.random()}
                    style={{ color: randomColor }}
                >
                    <Typography
                        variant="h5"
                        style={styles.quote}
                    >
                        "{this.props.quote}"
                    </Typography>
                    <Typography
                        variant="body1"
                        style={styles.author}
                    >
                        -{this.props.author ? this.props.author : "Unknown"}-
                    </Typography>
                </div>
                </CardContent>
                <CardActions style={{ justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: randomColor,
                            color: "white",
                            marginRight: "20px",
                            marginBottom: "20px",
                            borderRadius: "5px",
                        }}
                        onClick={this.props.handleClick}
                    >
                        New quote
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

const styles = {
    quote: {
        margin: "20px",
        textAlign: "left",
    },
    author: {
        margin: "10px",
        fontStyle: "italic",
    }
};

export default QuoteAndAuthor;
