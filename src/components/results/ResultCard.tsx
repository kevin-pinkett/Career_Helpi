import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";




interface ResultsCardProps {
    title: string;
    description: string;
    traits: string[];
    jobRoles: string[];
    skills: string[];

}

/**
 * A functional React component that displays a card with details about results, 
 * including a title, description, traits, potential job roles, and skills.
 *
 * @component
 * @param {ResultsCardProps} props - The props for the ResultsCard component.
 * @param {string} props.title - The title of the result card.
 * @param {string} props.description - A brief description of the result.
 * @param {string[]} props.traits - A list of traits associated with the result.
 * @param {string[]} props.jobRoles - A list of potential job roles related to the result.
 * @param {string[]} props.skills - A list of skills relevant to the result.
 * @returns {JSX.Element} A styled card component displaying the provided information.
 */
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