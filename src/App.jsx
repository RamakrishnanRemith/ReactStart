import React, { useState } from "react";

import "./App.css";
import Login from "./Login";
import Register from "./Register";
import View from "./View";
import Edit from "./Edit";
import ContactForm from "./Email";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {
//   const [currentForm, setCurrentForm] = useState("login");

//   const toggleForm = (formName) => {
//     setCurrentForm(formName);
//   };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/View" element={<View />}></Route>
        <Route path="/Edit/:id" element={<Edit />}></Route>
        <Route path="/Email" element={<ContactForm />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

//   return (
//     <div className="App">
//       {currentForm === "login" ? (
//         <Login onFormSwitch={toggleForm} />
//       ) : (
//         <Register onFormSwitch={toggleForm} />
//       )}
//     </div>
//   );
// }

export default App;
