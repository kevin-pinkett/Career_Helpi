import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";




interface ResultsCardProps {
    title: string;
    description: string;
    traits: string[];
    jobRoles: string[];
    skills: string[];

}

function ResultsCard({ title, description, traits, jobRoles, skills}: ResultsCardProps) {


    return(
        <div className="Results-Card">

        <Card>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>

                <Card.Text><strong>Traits:</strong> {traits.join(", ")}</Card.Text>
                <Card.Text><strong>Potential Job Roles:</strong>
                <ul>
                    {jobRoles.map((role, i) => (
                        <li key={i}>{role}</li>
                    ))}</ul>
                 
                 </Card.Text>
                 
                <Card.Text><strong>Skills:</strong> 
                <ul>
                    {skills.map((skill, i) => (
                        <li key={i}>{skill}</li>
                    ))}</ul>
                </Card.Text>     

                <Button variant="primary">Go home</Button>
            </Card.Body>
        </Card>
        </div>
    )
}
export default ResultsCard;