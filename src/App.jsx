import { useState } from "react";

export default function App() {
  const [shopName, setShopName] = useState("Shop");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);

  // Add item
  const addItem = () => {
    if (!item || !price) return;
    setItems([...items, { item, price: Number(price) }]);
    setItem("");
    setPrice("");
  };

  // Remove item
  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Get safe shop name (fallback to "Shop")
  const safeShopName = shopName.trim() || "Shop";

  // Download JSON
  const downloadJSON = () => {
    const data = {
      [safeShopName]: {
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
      <h1>Shop Menu Creator</h1>

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

      {items.length > 0 && (
        <div className="item-list">
          <h3>Items:</h3>
          <ul>
            {items.map((it, index) => (
              <li key={index}>
                {it.item} — ₹{it.price}
                <button className="remove" onClick={() => removeItem(index)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="preview">
        <h3>JSON Preview:</h3>
        <pre>
          {JSON.stringify(
            {
              [safeShopName]: {
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
