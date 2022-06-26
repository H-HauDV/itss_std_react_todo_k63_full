import { useState, useEffect } from "react";

import { addToFirebase, getItemsFromFirebase } from "../lib/firebase";

function useFbStorage() {
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

  return [items, addItems];
}

export default useFbStorage;
