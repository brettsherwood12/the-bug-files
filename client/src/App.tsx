import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import Main from "./components/Main/Main";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Form />
      <Main />
    </div>
  );
};

export default App;
