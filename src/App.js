import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./Routes";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <>
      <div className="App">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AnimatePresence>
          <Routes />
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
