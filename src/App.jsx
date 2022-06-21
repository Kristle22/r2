import { useEffect, useState } from 'react';
// import './App.scss'
import './bootstrap.css';
import './crud.scss';
import Create from './Components/Create';
import List from './Components/List';
import Edit from './Components/Edit';
import TreeContext from './Components/TreeContext';
import axios from 'axios';
import Message from './Components/Message';
import GoodContext from './Components/Goods/GoodContext';
import CreateGoods from './Components/Goods/Create';

function App() {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // ////////////TREES///////////////
  const [trees, setTrees] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  // /////////////GOODS//////////////
  const [goods, setGoods] = useState(null);
  const [createDataGoods, setCreateDataGoods] = useState(null);

  const [message, setMessage] = useState(null);
  const [disableCreate, setDisableCreate] = useState(false);

  // ///////////////TREES//////////////
  // Read
  useEffect(() => {
    axios.get('http://localhost:3003/medziai').then((res) => {
      setTrees(res.data);
    });
  }, [lastUpdate]);

  //Create
  useEffect(() => {
    if (null === createData) return;
    axios
      .post('http://localhost:3003/medziai', createData)
      .then((res) => {
        showMessge(res.data.msg);
        console.log('res data', res.data);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessge({ text: error.message, type: 'danger' });
      })
      .then(() => {
        setDisableCreate(false);
      });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios
      .delete('http://localhost:3003/medziai/' + deleteData.id)
      .then((res) => {
        showMessge(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/medziai/' + editData.id, editData)
      .then((res) => {
        showMessge(res.data.msg);
        setLastUpdate(Date.now());
      });
    setLastUpdate(Date.now());
  }, [editData]);

  // /////////////GOODS//////////////
  // Create

  useEffect(() => {
    if (null === createDataGoods) return;
    axios.post('http://localhost:3003/gerybes', createDataGoods).then((res) => {
      console.log('res data', res.data);
      setLastUpdate(Date.now());
    });
  }, [createDataGoods]);

  // Read
  useEffect(() => {
    axios.get('http://localhost:3003/gerybes').then((res) => {
      setGoods(res.data);
    });
  }, [lastUpdate]);

  const showMessge = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <TreeContext.Provider
      value={{
        trees,
        setCreateData,
        setDeleteData,
        setModalData,
        modalData,
        setEditData,
        message,
        disableCreate,
        setDisableCreate,
        goods,
      }}
    >
      <GoodContext.Provider
        value={{
          setCreateData: setCreateDataGoods,
        }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <Create />
              <CreateGoods />
            </div>
            <div className='col-8'>
              <List />
            </div>
          </div>
        </div>
        <Edit />
        <Message />
      </GoodContext.Provider>
    </TreeContext.Provider>
  );
}
export default App;
