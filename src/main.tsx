import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {XooxUIProvider} from './lib';
import {GlobalToastRegion} from './test/toast/toast';

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <XooxUIProvider>
            <GlobalToastRegion/>
            <App />
        </XooxUIProvider>
    </React.StrictMode>,
)
