import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { datadogRum } from '@datadog/browser-rum';

const root = ReactDOM.createRoot(document.getElementById('root'));

datadogRum.init({
  applicationId: process.env.REACT_APP_DATADOG_APP_ID,
  clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
  site: process.env.REACT_APP_DATADOG_SITE,
  service: 'default',
  env: process.env.NODE_ENV,
  sampleRate: 100,
  premiumSampleRate: 100,
  trackInteractions: true,
  trackViewsManually: true, // <--- This is the important part
  defaultPrivacyLevel: 'mask-user-input',
  beforeSend: (event, context) => {
    console.log(event.view.name, event.service);

    if (event.type === 'resource' && event.resource.status_code >= 400 && event.resource.type === 'fetch') {
      event.context = {
        ...event.context,
        url: window.location.href
      };
      console.log('sending error to -> ', event.view.name);
    }
  },
});

datadogRum.startSessionReplayRecording();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
