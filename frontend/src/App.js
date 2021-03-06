import "./App.css";
import axios from "axios";
function App() {
  const makeApiRequest = () => {
    axios("/api/currentUser").then((response) => {
      console.log("response");
    });
  };
  return (
    <div className='App'>
      <h1>Hello change from docker</h1>
      <p>New line from</p>
      <p>line from socket and so on</p>
      <p>We are in dev mode</p>
      <button onClick={makeApiRequest}>Click to get API-request</button>
    </div>
  );
}

export default App;
