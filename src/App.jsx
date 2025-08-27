import { useState } from "react";

export default function App() {
  const [shopName, setShopName] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!item || !price) return;
    setItems([...items, { item, price: Number(price) }]);
    setItem("");
    setPrice("");
  };

  const downloadJSON = () => {
    const data = {
      Shop: {
        name: shopName,
        items: items,
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "shop.json";
    link.click();
  };

  return (
    <div className="app-container">
      <h1>Menu Creator</h1>

      <div className="form-group">
        <label>Shop Name:</label>
        <input
          type="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Item:</label>
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="button-row">
        <button className="primary" onClick={addItem}>
          Add Item
        </button>
        <button className="secondary" onClick={downloadJSON}>
          Download JSON
        </button>
      </div>

      <div className="preview">
        <h3>JSON Preview:</h3>
        <pre>
          {JSON.stringify(
            {
              Shop: {
                name: shopName,
                items: items,
              },
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
}
