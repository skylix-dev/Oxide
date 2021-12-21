import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { windowApi } from "../../../src/Exports";
import WindowPlatform from './../../../src/api/WindowPlatform';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
