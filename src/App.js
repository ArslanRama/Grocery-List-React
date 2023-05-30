import React, { useState, useEffect } from "react";
import "./App.css";
import Item from "./components/Item";
import { v4 as uuidv4 } from "uuid";

const arr = () => {
  const data = localStorage.getItem("data");
  return data ? JSON.parse(data) : [];
};

function App() {
  const [item, setItem] = useState("");
  const [list, setList] = useState(arr);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item && item.length <= 25) {
      const newItem = {
        id: uuidv4(),
        item: item,
        complete: false,
      };
      setList((prevList) => [...prevList, newItem]);
      setItem("");
    }
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    setItem(e.target.value);
  };

  return (
    <div className="App">
      <h1>Grocery List</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={item}
          placeholder="Enter the items"
          onChange={handleChange}
        />
        <button className="btn" type="submit">
          Add Items
        </button>
        <br />
        <br />
      </form>
      <div>
        {list.map((c) => (
          <Item
            key={c.id}
            id={c.id}
            item={c.item}
            list={list}
            setList={setList}
            complete={c.complete}
            setItem={setItem}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
