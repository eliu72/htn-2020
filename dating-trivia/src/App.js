import { Question } from "./question";
import { Option } from "./option";
import { Timer } from "./timer";

function App() {
  return (
    <div>
      <h3>Vino</h3>
      <h5>Meet. Chat. Play</h5>
      <Question question="Would you ever want to be famous?" />
      <Option option="Of course" />
      <Option option="Never" />
      <Option option="It might be nice" />
      <Option option="I used to want to" />
      <Timer />
    </div>
    
  );
}

export default App;
