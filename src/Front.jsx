import { useEffect } from 'react';
import { useState } from 'react';
import GoodFrontContext from './Front/Components/GoodFrontContext';
import ListFront from './Front/Components/ListFront';
import axios from 'axios';

function Front() {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [trees, setTrees] = useState(null);
  const [goods, setGoods] = useState(null);
  const [comments, setComments] = useState(null);
  const [rating, setRating] = useState(null);

  // READ TREES
  useEffect(() => {
    axios.get('http://localhost:3003/medziai').then((res) => {
      setTrees(res.data);
    });
  }, [lastUpdate]);

  // READ GOODS
  useEffect(() => {
    axios.get('http://localhost:3003/gerybes').then((res) => {
      setGoods(res.data);
    });
  }, [lastUpdate]);

  return (
    <GoodFrontContext.Provider value={{ trees, goods, setComments, setRating }}>
      <ListFront />
    </GoodFrontContext.Provider>
  );
}

export default Front;
