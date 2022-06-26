import { useState, useEffect } from "react";

import {
  addToFirebase,
  getItemsFromFirebase,
  updateItemFromFirebase,
  clearItemsFromFirebase,
} from "../lib/firebase";

function useFirebaseStorage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, [items]);
  const getItems = async () => {
    const _items = await getItemsFromFirebase();
    setItems(_items);
  };
  const addItems = async (item) => {
    const newItem = { text: item.text, done: item.done };
    await addToFirebase(newItem);
    setItems([...items, newItem]);
  };
  const updateItem = async (checked) => {
    const changes = { done: !checked.done };
    await updateItemFromFirebase(changes, checked.id);
    const newItemList = items.map((item) => {
      if (item.id === checked.id) {
        item = { ...item, changes };
      }
      return item;
    });
    setItems(newItemList);
  };

  const clearItems = () => {
    items.map((item) => {
      clearItemsFromFirebase(item);
    });
    setItems([]);
    console.log("cleared");
  };
  return [items, addItems, updateItem, clearItems];
}

export default useFirebaseStorage;
