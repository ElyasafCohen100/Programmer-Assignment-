import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { store } from "./store/store";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
