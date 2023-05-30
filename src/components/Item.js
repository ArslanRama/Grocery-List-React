import React from "react";
import "./Item.css";

const Item = ({ id, item, list, setList, complete }) => {
  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

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

  const handleItem = (e) => {
    const updatedItem = e.target.value;

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
    <div className={`item ${complete ? "complete" : ""}`}>
      <input
        type="text"
        value={item}
        onChange={handleItem}
      />
      <img
        onClick={() => handleComplete(id)}
        src="https://img.icons8.com/offices/40/000000/checked-2--v2.png"
        alt="Complete task"
        className="item-icon"
        style={{ width: "24px", height: "24px", marginRight: "5px" }} 
      />
      <img
        onClick={() => remove(id)}
        src="https://img.icons8.com/color/48/000000/trash.png"
        alt="Delete"
        className="item-icon"
        style={{ width: "24px", height: "24px" }} 
      />
    </div>
  );
};

export default Item;
