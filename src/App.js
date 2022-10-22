import "./App.css";
import React, { useState } from "react";
import Broccoli from "/Projekty/buy-broccoli/buy-broccoli/src/Images/Broccoli.png";

function App() {
  let [myBroccoli, setMyBroccoli] = React.useState([]);
  let [myPrice, setMyPrice] = React.useState("5");
  let [myAmount, setMyAmount] = React.useState("100");
  let [myAmount2, setMyAmount2] = React.useState("50");
  let [check, setCheck] = React.useState(0);

  let addBroccoli = () => {
    if (
      myPrice >= 0.1 &&
      myPrice <= 1000 &&
      (myPrice * 10) % 1 === 0 &&
      myAmount >= 10 &&
      myAmount % 10 === 0 &&
      myAmount <= 10000
    ) {
      let xxx = [
        ...myBroccoli,
        { price: myPrice, amount: myAmount, id: Math.random() },
      ];
      setMyBroccoli(xxx);
      let myNum = 0;
      for (let i = 0; i < xxx.length; i++) {
        myNum += Number(xxx[i].amount);
      }
      setCheck(myNum);
      setMyAmount("100");
      setMyPrice("5");
      console.log("Buy");
      return;
    } else {
      alert(
        "ERROR! Price per unit must be divisible by 0.1 and amount must be divisible by 10!"
      );
    }
  };

  let inputPrice = (e) => {
    setMyPrice(e.target.value);
  };
  let inputAmount = (e) => {
    setMyAmount(e.target.value);
  };
  let inputAmount2 = (e) => {
    setMyAmount2(e.target.value);
  };
  let deleteBroccoli = (e) => {
    setMyBroccoli(myBroccoli.filter((x) => x.id !== e));
    console.log("Delete");
  };

  let sellBroccoli = () => {
    if (myAmount2 <= check && myAmount2 >= "0" && myAmount2 % 10 == 0) {
      setCheck(check - myAmount2);
      let yyy = myBroccoli.length;
      myAmount2 = Number(myAmount2);

      for (let i = 0; i < yyy; i++) {
        if (myAmount2 < Number(myBroccoli[0].amount)) {
          myBroccoli[0].amount = Number(myBroccoli[0].amount) - myAmount2;
          setMyBroccoli(myBroccoli);
          myAmount2 = 50;
          setMyAmount2(myAmount2);
          console.log("Sell");
          return;
        } else if (myAmount2 === Number(myBroccoli[0].amount)) {
          myBroccoli = myBroccoli.filter((x) => x !== myBroccoli[0]);
          setMyBroccoli(myBroccoli);
          myAmount2 = 50;
          setMyAmount2(myAmount2);
          return;
        } else if (myAmount2 > Number(myBroccoli[0].amount)) {
          myAmount2 = myAmount2 - Number(myBroccoli[0].amount);
          myBroccoli = myBroccoli.filter((x) => x !== myBroccoli[0]);
          setMyBroccoli(myBroccoli);
          console.log("Sell2");
        }
      }
    }
  };

  return (
    <div className="App">
      <h1 className="Main-Text">Buy broccoli!</h1>
      <div className="Buying-Panel">
        <p className="Add">Add</p>
        <p className="Price">Price per unit:</p>
        <input
          onChange={inputPrice}
          value={myPrice}
          type="number"
          step="0.1"
          min="0.1"
          max="1000"
          className="Price-Input"
        />
        <p className="Amount">Amount</p>
        <input
          onChange={inputAmount}
          value={myAmount}
          type="number"
          step="10"
          min="10"
          max="10000"
          className="Number-Input"
        />
        <button
          className="Submit-Buy"
          onClick={() => {
            addBroccoli();
          }}
        >
          Add
        </button>
      </div>
      <div className="Selling-Panel">
        <p className="Issue">Issue</p>
        <p className="Sell-Amount">Amount</p>
        <input
          onChange={inputAmount2}
          value={myAmount2}
          step="10"
          min="10"
          max="1000"
          className="Selling-Value"
          type="number"
        />
        <button
          className="Submit-Sell"
          onClick={() => {
            sellBroccoli();
          }}
        >
          Sell
        </button>
      </div>
      <div className="Orders">
        {myBroccoli.map((x) => (
          <div>
            <img width="125" alt="" src={Broccoli} />
            <div className="Orders2">
              <div>{x.price} zł/unit</div>
              <div>
                {x.amount} units{""}
                <button
                  className="delButton"
                  onClick={() => {
                    deleteBroccoli(x.id, x.amount);
                  }}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <a
        className="App-link"
        href="https://github.com/Maciej-Orczykowski?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
      >
        Click to see more projects!
      </a>
    </div>
  );
}

export default App;
