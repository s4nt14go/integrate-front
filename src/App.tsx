// @ts-nocheck
import React, {useEffect} from 'react';
import './App.css';
import Header from "./components/Header";
import loadCivic from './scripts/load.js';

const { REACT_APP_appId: appId } = process.env;

var civicSip;
function App() {

  useEffect(() => {
    loadCivic(() => {
      civicSip = new window.civic.sip({
        appId,
        // OPTIONAL configuration
        hideIntro: false, // set to true to override intro screen (Proof of Identity only)
      });
      console.log('civicSip', civicSip);

      // Listen for data
      civicSip.on('auth-code-received', function (event: any) {
        console.log('auth-code-receive', event);
        /*
            event:
            {
                event: "scoperequest:auth-code-received",
                response: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJqdGkiOiI2Y2EwNTEzMi0wYTJmLTQwZjItYTg2Yi03NTkwYmRjYzBmZmUiLCJpYXQiOjE0OTQyMjUxMTkuMTk4LCJleHAiOjE0OTQyMjUyOTkuMTk4LCJpc3MiOiJjaXZpYy1zaXAtaG9zdGVkLXNlcnZpY2UiLCJhdWQiOiJodHRwczovL3BoNHg1ODA4MTUuZXhlY3V0ZS1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZGV2Iiwic3ViIjoiY2l2aWMtc2lwLWhvc3RlZC1zZXJ2aWNlIiwiZGF0YSI6eyJjb2RlVG9rZW4iOiJjY2E3NTE1Ni0wNTY2LTRhNjUtYWZkMi1iOTQzNjc1NDY5NGIifX0.gUGzPPI2Av43t1kVg35diCm4VF9RUCF5d4hfQhcSLFvKC69RamVDYHxPvofyyoTlwZZaX5QI7ATiEMcJOjXRYQ",
                type: "code"
            }
        */

        // encoded JWT Token is sent to the server
        var jwtToken = event.response;

        // Your function to pass JWT token to your server
        console.log('TODO: sendAuthCode(jwtToken)');
      });

      civicSip.on('user-cancelled', function (event: any) {
        console.log('user-cancelled', event);
        /*
            event:
            {
              event: "scoperequest:user-cancelled"
            }
        */
      });
      civicSip.on('read', function (event: any) {
        console.log('read', event);
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
      });
    });
  }, []);

  function signup(){
    civicSip.signup({ style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP });
  }

  return (
    <div className="App">
      <div className="container px-5 pb-12 mx-auto">

      <Header />

      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">

          <button onClick={signup}
            className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Log in with Civic
          </button>

        </div>
      </section>
      </div>
    </div>
  );
}

export default App;
