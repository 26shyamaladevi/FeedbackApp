import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App'

const domRoot = document.getElementById('root');

let root = createRoot(domRoot) 

root.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>
);
