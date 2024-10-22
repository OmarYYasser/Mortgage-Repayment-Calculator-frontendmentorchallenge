import { useState } from "react";
import calculator from "./images/icon-calculator.svg";

export function CalcSide({ setMortgageInfo, formInfo, setCalc }) {
  const [checker, setChecker] = useState({
    amount: true,
    rate: true,
    term: true,
  });
  return (
    <div className="calc">
      <div className="heading">
        <h1>Mortgage Calculator</h1>
        <span
          onClick={() => {
            setCalc(false);
            setChecker({
              amount: true,
              rate: true,
              term: true,
            });
            setMortgageInfo({
              amount: "",
              rate: "",
              term: "",
              type: "repayment",
            });
          }}
          style={{
            color: "#777777",
            cursor: "pointer",
            textDecoration: "underline",
          }}>
          Clear All
        </span>
      </div>
      <Form
        checker={checker}
        setChecker={setChecker}
        setCalc={setCalc}
        setMortgageInfo={setMortgageInfo}
        formInfo={formInfo}
      />
    </div>
  );
}
function Form({ setMortgageInfo, formInfo, setCalc, checker, setChecker }) {
  const [active, setActive] = useState("1");

  function check(e) {
    e.preventDefault();
    setChecker((info) => {
      info = {
        amount: formInfo.amount ? true : false,
        rate: formInfo.rate ? true : false,
        term: formInfo.term ? true : false,
      };
      if (info.amount && info.rate && info.term) setCalc(true);
      else setCalc(false);
      return info;
    });
  }
  return (
    <form onSubmit={check}>
      <div className="column">
        <label>Mortgage Amount</label>
        <div className={`first-input ${!checker.amount ? "error" : ""}`}>
          <input
            onFocus={(e) => {
              e.target.parentElement.classList.remove("error");
              e.target.parentElement.classList.add("focus");
              setChecker((e) => ({ ...e, amount: true }));
            }}
            onBlur={(e) => e.target.parentElement.classList.remove("focus")}
            onChange={(e) => {
              if (!isNaN(e.target.value)) {
                setMortgageInfo((info) => ({
                  ...info,
                  amount: Number(e.target.value),
                }));
              }
            }}
            style={{ color: !checker.amount ? "red" : null }}
            value={formInfo.amount}
            type="text"
          />
        </div>
        {!checker.amount && (
          <span style={{ color: "red" }}>This Field Is Required</span>
        )}
      </div>

      <div className="row">
        <div className="column term">
          <label>Mortgage Term</label>
          <div className={`redu ${!checker.term ? "error" : ""}`}>
            <input
              style={{ color: !checker.term ? "red" : null }}
              onFocus={(e) => {
                setChecker((e) => ({ ...e, term: true }));
                e.target.parentElement.classList.remove("error");
                e.target.parentElement.classList.add("focus");
              }}
              onBlur={(e) => e.target.parentElement.classList.remove("focus")}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  setMortgageInfo((info) => ({
                    ...info,
                    term: Number(e.target.value),
                  }));
                }
              }}
              value={formInfo.term}
              className={`redu ${!checker.term ? "error" : ""} `}
              type="text"
            />
          </div>
          {!checker.term && (
            <span style={{ color: "red" }}>This Field Is Required</span>
          )}
        </div>
        <div className="column rate">
          <label>Interest Rate</label>
          <div className={`redu ${!checker.rate ? "error" : ""}`}>
            <input
              onFocus={(e) => {
                setChecker((e) => ({ ...e, rate: true }));
                e.target.parentElement.classList.remove("error");
                e.target.parentElement.classList.add("focus");
              }}
              onBlur={(e) => e.target.parentElement.classList.remove("focus")}
              onChange={(e) => {
                if (!isNaN(Number(e.target.value))) {
                  setMortgageInfo((info) => ({
                    ...info,
                    rate: e.target.value,
                  }));
                }
              }}
              value={formInfo.rate}
              className={`redu ${!checker.rate ? "error" : ""}`}
              type="text"
            />
          </div>
          {!checker.rate && (
            <span style={{ color: "red" }}>This Field Is Required</span>
          )}
        </div>
      </div>
      <label>Mortgage Type</label>
      <fieldset
        value={active === "1" ? true : false}
        onClick={(e) => {
          setMortgageInfo((information) => {
            const obj = { ...information, type: "repayment" };
            return obj;
          });
          setActive("1");
        }}
        className={`${active === "1" ? "active" : ""}`}
        data-id="1">
        <label>
          <input checked={active == 1} type="radio" name="mortgage" /> Repayment
        </label>
      </fieldset>
      <fieldset
        className={`${active === "2" ? "active" : ""}`}
        onClick={(e) => {
          setActive("2");
          setMortgageInfo((information) => {
            const obj = { ...information, type: "interest" };
            return obj;
          });
        }}
        data-id="2">
        <label>
          <input checked={active == 2} type="radio" name="mortgage" /> Interest
          Only
        </label>
      </fieldset>
      <button type="submit">
        <img className="calc-img" alt="" src={calculator} />
        Calculate Repayment
      </button>
    </form>
  );
}
