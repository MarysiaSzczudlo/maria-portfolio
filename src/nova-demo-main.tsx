import React from 'react';
import { createRoot } from 'react-dom/client';
import PrototypeApp from './nova-demo/PrototypeApp';
import './nova-demo/index.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><PrototypeApp/></React.StrictMode>);
