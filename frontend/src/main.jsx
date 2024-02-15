import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {SnackbarProvider} from 'notistack';
console.log("Loaded Main");


// ReactDOM.createRoot(document.getElementById('root')).render(<App />, document.getElementById("root"));

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <SnackbarProvider>
    <App />
    </SnackbarProvider>
  </BrowserRouter>
  // <>aaa</>
)
 
