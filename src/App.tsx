import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import BreedList from "./components/breed/index";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <BreedList></BreedList>
        </div>
      </Provider>
    </>
  );
}

export default App;
