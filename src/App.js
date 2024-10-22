import { useState } from "react";
import { CalcSide } from "./CalcSide";
import { ResultSide } from "./ResultSide";

export default function App() {
  const [calc, setCalc] = useState(false);
  const [mortgageInfo, setMortgageInfo] = useState({
    amount: "",
    rate: "",
    term: "",
    type: "repayment",
  });

  return (
    <main>
      <Mortgage
        setCalc={setCalc}
        calc={calc}
        setMortgageInfo={setMortgageInfo}
        formInfo={mortgageInfo}
      />
    </main>
  );
}
function Mortgage({ setMortgageInfo, formInfo, calc, setCalc }) {
  return (
    <div className="app">
      <CalcSide
        setCalc={setCalc}
        setMortgageInfo={setMortgageInfo}
        formInfo={formInfo}
      />
      <ResultSide calc={calc} calcInfo={formInfo} />
    </div>
  );
}
