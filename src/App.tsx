import React, { useState } from 'react';
import './App.css';
import { Button, Form } from 'react-bootstrap';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { BasicQuestionsPage } from './components/BasicQ';
import { FAQPage } from './components/FAQ';
import { DetailQuestionsPage } from './components/DetailedQ';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [page, setPage] = useState<string>('homePage');
  
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

      <div className="Page">
        {page === 'homePage' && (<div><HomePage setPage={setPage} /></div>)}
        {page === 'basicPage' && (<div><BasicQuestionsPage /></div>)}
        {page === 'detailedPage' && (<div><DetailQuestionsPage /></div>)}
        {page === 'faqPage' && (<div><FAQPage /></div>)}
      </div>

      <div className='footer-wrapper'>
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
