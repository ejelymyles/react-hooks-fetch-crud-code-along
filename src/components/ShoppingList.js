import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


//useEffect to make a Get request to data, to display items whenc component is rendered

useEffect(() => {
  fetch("http://localhost:4000/items")
  .then((r) => r.json())
  .then((items) => setItems(items));
}, []);

//add callback to pass to itemForm so that when a new form is submitted, that data can be shared with Shoppinglist
function handleAddItem(newItem){
  setItems([...items, newItem]);
}

// add callback to pass to Item component so that when an item isInCart or !isInCart, that info can be shared with ShoppingList
function handleUpdateItem(updatedItem){
  const updatedItems = items.map((item) => {
    if(item.id === updatedItem.id) {
      return updatedItem;
    } else {
      return item;
    }
  });
  setItems(updatedItems)
}

// add a callback to pass to the item component so that when the delete button is clicked, that info can be shared with ShoppingList
function handleDeleteItem(deletedItem){
  const updatedItems = items.filter((item) => item.id !== deletedItem.id);
  setItems(updatedItems);
}

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items" >
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} onDeleteItem={handleDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
