import React, { useState, useEffect } from "react";
import "./App.css";
import Item from "./components/Item";
import { v4 as uuidv4 } from "uuid";

// This arr function retrieves data from the localStorage using the key "data". 
// If there is data stored, it parses the data from a JSON string format to an array format. 
// Otherwise, it returns an empty array.
const arr = () => {
  const data = localStorage.getItem("data");
  return data ? JSON.parse(data) : [];
};

// The App function is defined, which represents the main component of the application. 
// It uses the useState hook to define two state variables: item and list. 
function App() {
  // The item state variable holds the value of the input field where users can enter new grocery items. 
  const [item, setItem] = useState("");
  // The list state variable holds an array of grocery items.
  const [list, setList] = useState(arr);
// The handleSubmit is called when the user submits the form, which occurs when they click the "Add Items" button or press the Enter key. 
// It takes an event (e) as an argument and prevents the default form submission behavior. 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // It then checks if the item state variable is not empty and its length is less than or equal to 25 characters.
    // If both conditions are true, a new item object is created with a unique id generated using the uuidv4 function, the item value from the state, and a complete property set to false.
    if (item && item.length <= 25) {
      // The new item is added to the list state using the setList function and the item state is reset to an empty string using the setItem function. 
      const newItem = {
        id: uuidv4(),
        item: item,
        complete: false,
      };
      // Spread operator (...): to create a new array by spreading the existing prevList array and adding the newItem to the end.
      setList((prevList) => [...prevList, newItem]);
      setItem("");
    }
  };
// It uses the localStorage.setItem method to store the list array as a JSON string using the key "data".
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(list));
  }, [list]);

// The handleChange function takes an event (e) as an argument and updates the item state variable with the value from the input field using the setItem function.
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

      {/* Inside the div, the list state array is mapped over to render individual Item components. 
      Each Item component receives props such as key, id, item, list, setList, complete, and setItem. 
      These props are used to display and manage each grocery item in the list. */}
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
