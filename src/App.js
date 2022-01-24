import "./App.css";
import Answer1 from "./components/Question1";
import Answer2 from "./components/Question2";

function App() {
  return (
    <div className="App">
      <h3>Question 1</h3>
      <Answer1 />

      <hr />

      <h3>Question 2</h3>
      <Answer2 />
    </div>
  );
}

export default App;
