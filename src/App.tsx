import React, { useEffect, useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { Header } from './components/header/Header';
import { HomePage } from './components/home-page/HomePage';
import { BasicQuestionsPage } from './components/basic-questions/BasicQ';
import { FAQPage } from './components/faq/FAQ';
import { DetailQuestionsPage } from './components/detailed-questions/DetailedQ';
import { ResultsPage } from './components/results/Results';
import { AIQuestionsPage } from './components/create-your-own/AIQ';
import { ThemeProvider } from './components/dark-mode/theme-context';
import { TextSizeProvider } from './components/text-size/TextSizeContext';
//import { TTS } from './components/accessibility/TTS';

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
  const [answers, setAnswers] = useState<string[]>([]); //for the answers to the questions
  const [questions, setQuestions] = useState<string[]>([]); //for the questions to be asked
  const [key, setKey] = useState<string>(""); //for api key input
  const [hasValidKey, setHasValidKey] = useState<boolean>(false);
  const [page, setPage] = useState<string>('homePage');
  
  useEffect(()=>{
    //local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
    const saveKeyData = "MYKEY";
    const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
    if (prevKey !== null) {
      setKey(JSON.parse(prevKey));
      setHasValidKey(true);
    }
  }, []);

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    validateApiKey(key).then((valid) => {
      if (valid){
        localStorage.setItem("MYKEY", JSON.stringify(key));
        setHasValidKey(true);
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
      } else {
        setHasValidKey(false);
        alert("Invalid ChatGPT API Key. Please try again.")
      }
    }).catch(()=> {
      setHasValidKey(false);
      alert("Error validating ChatGPT API Key. Try again.")
    })

  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }


  // validation response method was taken from chatgpt and openai docs, which described the correct response status codes
  async function validateApiKey(key: string): Promise<boolean> {
    try{
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "test for api key" }],
          max_tokens: 1
        })
      });
  
      if (response.status === 200) {
        return true;
      } else if (response.status === 401) {
        return false; 
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Validation error:", error);
      throw error;
    }
  }

  return (
    <ThemeProvider>
      <TextSizeProvider>
      <div className="App">
        <div className="Header-Placeholder"></div>
        <div className="Header-Wrapper">
          <div style={{
            display: "flex",
            alignItems: "center"
          }}>
            <img src="assets/Helpi Mascot.png" alt="mascot" style={{
                //display: "flex",
                width: "var(--ozzie)",
                padding: "15px",
                }}></img>
            <div id="header-title">Koalafi</div>
          </div>
          <Header page={page} setPage={setPage} disabled={!hasValidKey}/>
        </div>

        <div className="Page" data-testid="page">
          {page === 'homePage' && (
            <div>
              <div className="Greeting-Box">
                <img src="assets/Helpi Mascot (fullclear).png" alt="mascot" style={{
                    width: "25%",
                    height: "25%",
                  }}></img>
                <div style = {{fontSize: "var(--small-text)"}} className="Greeting-Text">
                  <div style={{position: "absolute", top: "10px", right: "10px"}}>
                    {/* <TTS text = "Hello! My name's Ozzie, and I'm a career matching wizard! Ready to see what you're koalafied for? Enter your ChatGPT API Key below to get started!"></TTS> */}
                  </div> 
                  <span> Hello! My name's Ozzie, and I'm a career matching wizard! Ready to see what you're koalafied for? </span>
                  <span style={{ fontWeight: "bold" }}>Enter your ChatGPT API Key below to get started! </span>
                  
                  <Form>
                    <Form.Label>API Key:</Form.Label>
                    <Form.Control style={{fontSize: "var(--small-text)"}} type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
                    <br></br>
                    <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
                  </Form>
                </div>
              </div>
              <HomePage setPage={setPage} hasValidKey={hasValidKey} />
              </div>)}
          {page === 'basicPage' && (<div><BasicQuestionsPage setPage={setPage} answers={answers} setAnswers={setAnswers} setQuestions={setQuestions}/></div>)}
          {page === 'detailedPage' && (<div><DetailQuestionsPage setPage={setPage} answers={answers} setAnswers={setAnswers} setQuestions={setQuestions}/></div>)}
          {page === 'faqPage' && (<div><FAQPage /></div>)}
          {page === 'resultsPage' && (<div><ResultsPage answers={answers} questions={questions} /></div>)}
          {page === 'aiPage' && (<div><AIQuestionsPage setPage={setPage} answers={answers} setAnswers={setAnswers} setQuestions={setQuestions}/></div>)}
        </div>
      
        <div className='footer-wrapper' data-testid="footer">
          <footer id="footer">
            
          </footer>
        </div>

      </div>
      </TextSizeProvider>
    </ThemeProvider>
  );
}

export default App;
