import React from "react";
import { Button, Card, CardContent, CardActions } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

/**
 * QuoteAndAuthor renders the quote contents in a Card for display
 */

class QuoteAndAuthor extends React.Component {
    render() {
        const randomColor = this.props.displayColor();
        return (
            <Card className="quoteBox">
                <CardContent>
                    <div className="fadeIn" key={Math.random()} style={{ color: randomColor }}>
                        <Typography variant="h6" style={styles.quote}>
                            "{this.props.quote}"
                        </Typography>
                        <Typography variant="body2" style={styles.author}>
                            - {this.props.author} -
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
        )
    }
}

const styles = {
    quote: {
        margin: "10px",
        textAlign: "left",
    },
    author: {
        margin: "10px",
        fontStyle: "italic",
    }
};

export default QuoteAndAuthor;
