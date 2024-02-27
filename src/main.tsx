import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {XooxUIProvider} from '../src/lib';

// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <XooxUIProvider>
            <main className="text-foreground bg-background">
                <App/>
            </main>
        </XooxUIProvider>
    </React.StrictMode>
,
)
