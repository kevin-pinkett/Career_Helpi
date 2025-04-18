import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { Header } from './components/header/Header';
import { HomePage } from './components/home-page/HomePage';
import { BasicQuestionsPage } from './components/basic-questions/BasicQ';
import { FAQPage } from './components/faq/FAQ';
import { DetailQuestionsPage } from './components/detailed-questions/DetailedQ';
import { ResultsPage } from './components/results/Results';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

/**
 * The main application component for the Career Helpi app.
 * 
 * This component manages the overall structure and state of the application, 
 * including navigation between pages, handling API key input, and maintaining 
 * user answers and questions. It also renders the header, footer, and the 
 * appropriate page content based on the current state.
 * 
 * @component
 * @returns {JSX.Element} The rendered App component.
 * 
 * @remarks
 * - The `App` component uses React's `useState` hook to manage the following states:
 *   - `answers`: Stores the user's answers to the questions.
 *   - `questions`: Stores the questions to be asked.
 *   - `key`: Stores the API key input by the user.
 *   - `page`: Tracks the current page being displayed.
 * - The API key is stored in local storage upon submission and the page is reloaded 
 *   to ensure the key is refreshed for use.
 * 
 * @example
 * ```tsx
 * <App />
 * ```
 * 
 * @state {number[]} answers - Array of answers provided by the user.
 * @state {string[]} questions - Array of questions to be displayed.
 * @state {string} key - The API key input by the user.
 * @state {string} page - The current page being displayed (e.g., 'homePage', 'basicPage').
 * 
 * @function handleSubmit
 * Stores the API key in local storage and reloads the page to refresh the key.
 * 
 * @function changeKey
 * Updates the `key` state whenever the user modifies the API key input field.
 * 
 * @childcomponent {Header} Renders the header with navigation controls.
 * @childcomponent {HomePage} Displays the home page content.
 * @childcomponent {BasicQuestionsPage} Displays the basic questions page.
 * @childcomponent {DetailQuestionsPage} Displays the detailed questions page.
 * @childcomponent {FAQPage} Displays the FAQ page.
 * @childcomponent {ResultsPage} Displays the results page with user answers and questions.
 * 
 * @footer
 * Contains a form for the user to input and submit their API key.
 */
function App() {
  const [answers, setAnswers] = useState<number[]>([]); //for the answers to the questions
  const [questions, setQuestions] = useState<string[]>([]); //for the questions to be asked
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [page, setPage] = useState<string>('homePage');
  // const [answers, setAnswers] = useState<string[]>([]); //for the answers to the questions
  


  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="App">

      <div className="Header-Wrapper">
        <img src="assets/Helpi Mascot.png" alt="mascot" style={{
            display: "flex",
            justifySelf: "center",
            height: "15%",
            width: "15%",
            padding: "20px"
            }}></img>
        <div id="header-title">The Career Helpi</div>
      </div>

      <Header page={page} setPage={setPage}/>


      <div className="Page" data-testid="page">
        {page === 'homePage' && (<div><HomePage setPage={setPage} /></div>)}
        {page === 'basicPage' && (<div><BasicQuestionsPage setPage={setPage} answers={answers} setAnswers={setAnswers} setQuestions={setQuestions}/></div>)}
        {page === 'detailedPage' && (<div><DetailQuestionsPage setPage={setPage} answers={answers} setAnswers={setAnswers} setQuestions={setQuestions}/></div>)}
        {page === 'faqPage' && (<div><FAQPage /></div>)}
        {page === 'resultsPage' && (<div><ResultsPage answers={answers} questions={questions} /></div>)}
      </div>

      <div className='footer-wrapper' data-testid="footer">
        <footer id="footer">
          <Form>
            <Form.Label>API Key:</Form.Label>
            <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
            <br></br>
            <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
          </Form>
        </footer>
      </div>

    </div>
  );
}

export default App;
