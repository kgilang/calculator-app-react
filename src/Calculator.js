import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleDigitClick = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const handleOperatorClick = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue == null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = operate(currentValue, inputValue, operator);
      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEqualsClick = () => {
    const inputValue = parseFloat(display);

    if (prevValue != null && operator) {
      const newValue = operate(prevValue, inputValue, operator);
      setPrevValue(null);
      setDisplay(String(newValue));
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const operate = (a, b, op) => {
    switch (op) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : 'Error';
      default:
        return b;
    }
  };

  return (
    <div className="calculator">
      <div className="display-container">
        <input type="text" className="display" value={display} readOnly />
      </div>
      <div className="buttons">
        <button className="btn button" onClick={() => handleDigitClick(7)}>7</button>
        <button className="btn button" onClick={() => handleDigitClick(8)}>8</button>
        <button className="btn button" onClick={() => handleDigitClick(9)}>9</button>
        <button className="btn button operator" onClick={() => handleOperatorClick('/')}>/</button>
        <button className="btn button" onClick={() => handleDigitClick(4)}>4</button>
        <button className="btn button" onClick={() => handleDigitClick(5)}>5</button>
        <button className="btn button" onClick={() => handleDigitClick(6)}>6</button>
        <button className="btn button operator" onClick={() => handleOperatorClick('*')}>*</button>
        <button className="btn button" onClick={() => handleDigitClick(1)}>1</button>
        <button className="btn button" onClick={() => handleDigitClick(2)}>2</button>
        <button className="btn button" onClick={() => handleDigitClick(3)}>3</button>
        <button className="btn button operator" onClick={() => handleOperatorClick('-')}>-</button>
        <button className="btn button" onClick={() => handleDigitClick(0)}>0</button>
        <button className="btn button" onClick={() => handleOperatorClick('.')}>.</button>
        <button className="btn button equal" onClick={handleEqualsClick}>=</button>
        <button className="btn button operator" onClick={() => handleOperatorClick('+')}>+</button>
      </div>
      <div className="clean">
        <button className="btn button clear" onClick={handleClearClick}>CLEAR</button>
      </div>
    </div>
  );
};

export default Calculator;
