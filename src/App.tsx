import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import Header from "./components/Header";
import loadCivic from './scripts/load.js';
import Notification, {Severity} from "./components/Notification";
import SyntaxHighlighter from "react-syntax-highlighter";
import styles from "./App.module.css";
import config from './config';

const { REACT_APP_appId: appId } = process.env;

let civicSip: any;
function App() {

  const NotificationRef = useRef<any>();
  const [ results, setResults ] = useState<any>(null);
  useEffect(() => {
    loadCivic(() => {
      // @ts-ignore
      civicSip = new window.civic.sip({
        appId,
        // OPTIONAL configuration
        hideIntro: false, // set to true to override intro screen (Proof of Identity only)
      });
      console.log('civicSip', civicSip);

      // Listen for data
      civicSip.on('auth-code-received', function (event: any) {
        console.log('auth-code-receive', event);
        NotificationRef.current.start(event.event, Severity.SUCCESS);
        /*
            event:
            {
                event: "scoperequest:auth-code-received",
                response: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI2Y2EwNTEzMi0wYTJmLTQwZjItYTg2Yi03NTkwYmRjYzBmZmUiLCJpYXQiOjE0OTQyMjUxMTkuMTk4LCJleHAiOjE0OTQyMjUyOTkuMTk4LCJpc3MiOiJjaXZpYy1zaXAtaG9zdGVkLXNlcnZpY2UiLCJhdWQiOiJodHRwczovL3BoNHg1ODA4MTUuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZGV2Iiwic3ViIjoiY2l2aWMtc2lwLWhvc3RlZC1zZXJ2aWNlIiwiZGF0YSI6eyJjb2RlVG9rZW4iOiJjY2E3NTE1Ni0wNTY2LTRhNjUtYWZkMi1iOTQzNjc1NDY5NGIifX0.gUGzPPI2Av43t1kVg35diCm4VF9RUCF5d4hfQhcSLFvKC69RamVDYHxPvofyyoTlwZZaX5QI7ATiEMcJOjXRYQ",
                type: "code"
            }
        */

        // encoded JWT Token is sent to the server
        const jwtToken = event.response;

        // Your function to pass JWT token to your server
        sendAuthCode(jwtToken);
      });

      civicSip.on('user-cancelled', function (event: any) {
        console.log('user-cancelled', event);
        NotificationRef.current.start(event.event, Severity.INFO);
        /*
            event:
            {
              event: "scoperequest:user-cancelled"
            }
        */
      });
      civicSip.on('read', function (event: any) {
        console.log('read', event);
        NotificationRef.current.start(event.event, Severity.INFO);
        /*
            event:
            {
              event: "scoperequest:read"
            }
        */
      });


      // Error events.
      civicSip.on('civic-sip-error', function (error: any) {
        // handle error display if necessary.
        console.log('   Error type = ' + error.type);
        console.log('   Error message = ' + error.message);
        NotificationRef.current.start(error.toString(), Severity.ERROR);
      });
    });
  }, []);

  function sendAuthCode(jwtToken: string) {
    fetch(`${config.API_URL}/exchange-code`, {
      method: 'POST',
      body: jwtToken,
    })
      .then(response => {
        console.log('response', response);
        return response.json();
      })
      .then(data => {
        console.log('Resolved:', data);
        setResults(data);
      })
      .catch(error => {
        console.log('Rejected:', error);
        setResults(error);
      });
  }

  function signup(){
    setResults(null);
    civicSip.signup({ style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP });
  }

  return (
    <div className="App">
      <div className="container px-5 pb-12 mx-auto">

      <Header />

      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">

          <button onClick={signup} id="civicButton" className={`civic-button civic-button-bold mx-auto focus:outline-none`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#FFFFFF">
              <path d="M2.364 8c0-3.36 2.716-6.08 6.06-6.08a6.057 6.057 0 015.328 3.178.96.96 0 101.687-.916A7.977 7.977 0 008.425 0C4.015 0 .444 3.584.444 8s3.57 8 7.98 8a7.977 7.977 0 007.015-4.182.96.96 0 00-1.687-.916 6.056 6.056 0 01-5.327 3.178c-3.345 0-6.061-2.72-6.061-6.08z"/><path d="M9.884 7.04c0 .426-.186.81-.48 1.073V10.4h-1.92V8.113a1.44 1.44 0 112.4-1.073z"/>
            </svg>
            Continue with Civic
          </button>

        </div>
      </section>

        <div className='mt-8 text-left'>
          {
            results &&
            <div className='mb-5'>
              <SyntaxHighlighter language='json' className={`${styles.json}`}>
                {JSON.stringify(results, null, 2)}
              </SyntaxHighlighter>
            </div>
          }
        </div>

      </div>
      <Notification ref={NotificationRef} />
    </div>
  );
}

export default App;
