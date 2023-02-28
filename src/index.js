import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import { NotificationsProvider } from '@mantine/notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NotificationsProvider>
    <Provider store={store}>  
    <App />
    </Provider>
    </NotificationsProvider>
  </React.StrictMode>
);

reportWebVitals();
