import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
// import { HelloWorldApp } from './HelloWorldApp';
// import { FirstApp } from './FirstApp';
import { CounterApp } from './CounterApp';
import './styles.css';

ReactDOM.createRoot ( document.getElementById ( 'root' ) ).render (
    <StrictMode>
        {/* <HelloWorldApp/> */}
        {/* <FirstApp title="Hola, soy Goku"/> */}
        <CounterApp value={777}/>
    </StrictMode>
);