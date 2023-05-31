/* It allows the user to update the item's text, mark it as complete, and delete it from the list. 
The component receives and modifies the list state through the list and setList props, 
and it manages the complete state of the item through the complete prop. */

import React from "react";
import "./Item.css";
import { FaTrash } from "react-icons/fa";

// These props are used to display and manage a single item in a list.
const Item = ({ id, item, list, setList, complete }) => {
  // The remove function takes an id as an argument and is called when the user clicks on the delete button. It uses the setList function, which is passed as a prop, to update the list state by filtering out the item with the specified id.
  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  // The handleComplete function takes an id as an argument and is called when the user clicks on the complete button. It uses the setList function to update the list state by mapping over the existing list and toggling the complete property of the item with the specified id.
  const handleComplete = (id) => {
    setList(
      list.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            complete: !item.complete,
          };
        }
        return item;
      })
    );
  };

  // The handleItem function is called when the user types in the input field. It takes an event (e) as an argument and extracts the updated item value from the event target's value.
  const handleItem = (e) => {
    const updatedItem = e.target.value;

    // If the length of the updated item is less than or equal to 25 characters, it uses the setList function to update the list state by mapping over the existing list and updating the item property of the item with the specified id.
    if (updatedItem.length <= 25) {
      setList(
        list.map((el) => {
          if (el.id === id) {
            return {
              ...el,
              item: updatedItem,
            };
          }
          return el;
        })
      );
    }
  };

  return (
    // If complete is true, the resulting element will have both the "item" and "complete" classes.
    // If complete is false or falsy, the element will only have the "item" class
    <div className={`item ${complete ? "complete" : ""}`}>
      <input type="text" value={item} onChange={handleItem} />
      <input
        type="checkbox"
        checked={complete}
        onChange={() => handleComplete(id)}
        className="item-icon"
        style={{ marginRight: "5px" }}
      />
      <button
        onClick={() => remove(id)}
        className="item-icon"
        style={{
          width: "24px",
          height: "24px",
          padding: 0,
          border: "none",
          background: "none",
        }}
      >
        <FaTrash style={{ width: "100%", height: "100%" }} />
      </button>
    </div>
  );
};

export default Item;
