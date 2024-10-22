import { useState } from "react";
import calculatorImg from "./images/illustration-empty.svg";

export function ResultSide({ calc, calcInfo }) {
  function getResult() {
    const principal = calcInfo.amount; // Loan amount (P)
    const monthlyRate = calcInfo.rate / 100 / 12; // Monthly interest rate (r)
    const totalPayments = calcInfo.term * 12; // Total number of payments (n)

    // Monthly payment formula
    const monthlyRepayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    // Total repayment
    const totalRepayment = monthlyRepayment * totalPayments;

    // Interest paid
    const interestAmount = totalRepayment - principal;

    if (calcInfo.type === "repayment") {
      return {
        type: "Monthly Repayment",
        result: (monthlyRepayment * 1000).toFixed(2).toLocaleString(),
        total: (totalRepayment * 1000).toFixed(2).toLocaleString(),
      };
    } else {
      return {
        type: "Interest Rate",
        result: (interestAmount * 1000).toFixed(2).toLocaleString(),
        total: (totalRepayment * 1000).toFixed(2).toLocaleString(),
      };
    }
  }
  return (
    <div className="result">
      {calc ? <CalcTrue result={getResult} /> : <CalcFalse />}
    </div>
  );
}

function CalcTrue({ result }) {
  const textColor = "#9ebacf";
  const myResult = result();
  return (
    <div>
      <h2>Your Result</h2>
      <p>
        Your result are shown below based on the information you provided. To
        adhust the result , edit the form and click "calculate repayments" again
      </p>
      <div
        style={{
          padding: "15px",
          borderTop: "2px solid hsl(61, 70%, 52%)",
          borderRadius: "15px",
          background: "hsl(201, 66%, 13%)",
        }}>
        <p style={{ margin: "0" }}>Your {myResult.type}</p>
        <h3 style={{ color: "hsl(61, 70%, 52%)", fontSize: "32px" }}>
          ${myResult.result}
        </h3>
        <hr style={{ margin: "20px 0" }} />
        <p>Total you will repay over the term</p>
        <b>${myResult.total}</b>
      </div>
    </div>
  );
}

function CalcFalse() {
  return (
    <div
      style={{
        height: "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}>
      <img src={calculatorImg} alt="calculator image" />
      <h2>Result Shown Here</h2>
      <p style={{ margin: "0" }}>
        complete the form and click "calculator payments" to see what monthly
        repayment would be
      </p>
    </div>
  );
}
