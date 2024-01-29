import React, { useState, useEffect } from "react";
import { getExchangeRate } from "./SelectBox";
import "./SelectConverter.css";

const SelectConverter = () => {
  const [exchangeRate, setExchangeRate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("KRW");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const rate = await getExchangeRate("USD", selectedCountry);
        setExchangeRate(rate);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, [selectedCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 입력한 금액이 없거나 0원이거나 숫자가 아닌 경우 에러 처리
    // 입력한 금액이 없을 경우 에러 처리
    if (!amount) {
      window.alert("금액을 다시 입력해주세요.");
      return;
    }

    // 입력한 금액이 0 이하인 경우 에러 처리
    if (parseFloat(amount) <= 0) {
      window.alert("0보다 큰 금액을 입력해주세요.");
      return;
    }

    // 입력한 금액이 숫자가 아닌 경우 에러 처리
    if (isNaN(parseFloat(amount))) {
      window.alert("숫자를 입력해주세요.");
      return;
    }

    // 입력한 금액을 선택된 국가의 환율로 변환
    const convertedValue = amount * exchangeRate;
    setConvertedAmount(convertedValue.toFixed(2));
  };

  const handleChangeCountry = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <h1>환율 계산기</h1>
        <p>송금국가 : 미국(USD)</p>
        <form onSubmit={handleSubmit}>
          <label>
            수취국가:
            <select value={selectedCountry} onChange={handleChangeCountry}>
              <option value="KRW">한국(KRW)</option>
              <option value="JPY">일본(JPY)</option>
              <option value="CNY">중국(CNY)</option>
              <option value="EUR">유럽(EUR)</option>
              <option value="GBP">영국(GBP)</option>
              <option value="CAD">캐나다(CAD)</option>
            </select>
          </label>
          <p>
            환율:{" "}
            {exchangeRate
              ? `1 USD = ${exchangeRate.toFixed(2)} ${selectedCountry} `
              : "로딩 중..."}
          </p>
          <div>
            송금액:
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            USD
          </div>
          <button type="submit">계산</button>
          {convertedAmount && (
            <p>
              환전 금액: {convertedAmount} {selectedCountry}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SelectConverter;
