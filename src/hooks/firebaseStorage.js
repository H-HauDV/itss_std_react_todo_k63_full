import { useState, useEffect } from "react";

import { addToFirebase } from "../lib/firebase";

function useFbStorage() {
  const [items, setItems] = useState([]);

  const addItems = async (item) => {
    const newItem = { text: item.text, done: item.done };
    await addToFirebase(newItem);
    setItems([...items, newItem]);
  };

  return [items, addItems];
}

export default useFbStorage;
