import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";

function ResultsCard() {
    return(
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Results</Card.Title>
                <Card.Text>
                    Your results will be displayed here.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>


    )

}