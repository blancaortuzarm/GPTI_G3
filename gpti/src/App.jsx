import React from 'react';
import MultiStepForm from './Components/Widget';
import './App.css';
import AuthProvider from './auth/AuthProvider'

function App() {

  return (
    <AuthProvider>
    <div className="app">
        <MultiStepForm />
    </div>
    </AuthProvider>
  );
}

export default App
