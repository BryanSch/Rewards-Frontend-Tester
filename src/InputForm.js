import React, { useState, useEffect } from "react";
import api from "./api";

const InputForm = () => {
  const [retailer, setRetailer] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchaseTime, setPurchaseTime] = useState("");
  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState([]);
  const [total, setTotal] = useState("");
  const [id, setId] = useState("");
  const [points, setPoints] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [buttonColor, setButtonColor] = useState("lightblue");

  // Automatically calculate total whenever prices change
  useEffect(() => {
    const total = prices.reduce((acc, price) => acc + parseFloat(price), 0);
    setTotal(formatPrice(total));
  }, [prices]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const itemDescriptions = items.map((item) => item.trim());

    const itemPrices = prices.map((price) =>
      formatPrice(parseFloat(price.trim()))
    );

    const itemsData = itemDescriptions.map((description, i) => {
      return { shortDescription: description, price: itemPrices[i] };
    });

    const data = {
      retailer,
      purchaseDate,
      purchaseTime,
      items: itemsData,
      total,
    };

    try {
      const response = await api.post("/receipts/process", data);
      setId(response.data.id);
      const pointsResponse = await api.get(
        `/receipts/${response.data.id}/points`
      );
      setPoints(pointsResponse.data.points);
    } catch (error) {
      console.log(error);
    }
  };

  const formatPrice = (value) => {
    return value.toFixed(2);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
          width: "80%",
          maxWidth: "400px",
        }}
      >
        <label style={{ fontWeight: "bold" }}>
          Retailer:
          <input
            type="text"
            value={retailer}
            onChange={(e) => setRetailer(e.target.value)}
          />
        </label>
        <label style={{ fontWeight: "bold" }}>
          Purchase Date:
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </label>
        <label style={{ fontWeight: "bold" }}>
          Purchase Time:
          <input
            type="time"
            value={purchaseTime}
            onChange={(e) => setPurchaseTime(e.target.value)}
          />
        </label>
        <label style={{ fontWeight: "bold" }}>
          Items: (enter multiple separated by commas)
          <input
            type="text"
            value={items.join(",")}
            onChange={(e) =>
              setItems(e.target.value.split(",").map((item) => item.trim()))
            }
          />
        </label>
        <label style={{ fontWeight: "bold" }}>
          Prices: (enter multiple separated by commas)
          <input
            type="text"
            value={prices.join(",")}
            onChange={(e) =>
              setPrices(e.target.value.split(",").map((price) => price.trim()))
            }
          />
        </label>
        <label style={{ fontWeight: "bold" }}>
          Total: (will auto compute)
          <input type="number" value={total} readOnly />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: buttonColor,
            fontWeight: "bold",
            padding: "10px 20px",
            fontSize: "16px",
            fontStyle: "Arial",
          }}
        >
          Submit
        </button>
        {id && (
          <p style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
            Receipt ID: {id}
          </p>
        )}
        {points && (
          <p style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
            Total Points: {points}
          </p>
        )}
      </form>
    </div>
  );
};

export default InputForm;
