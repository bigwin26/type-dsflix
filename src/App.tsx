import React from "react";
import GlobalStyles from "./Components/Common/GlobalStyles";
import Responsive from "./Components/Common/Responsive";
import Header from "./Components/Common/Header";
import Router from "./Router";

function App() {
  return (
    <Responsive>
      <GlobalStyles />
      <Header />
      <Router />
    </Responsive>
  );
}

export default App;
