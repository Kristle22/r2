import { useEffect, useState } from 'react';
// import './App.scss'
import './bootstrap.css';
import './crud.scss';
import Create from './Components/Create';
import List from './Components/List';
import Edit from './Components/Edit';
import TreeContext from './Components/TreeContext';
import axios from 'axios';

function App() {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [trees, setTrees] = useState(null);

  const [modalData, setModalData] = useState(null);

  const [createData, setCreateData] = useState(null);

  const [deleteData, setDeleteData] = useState(null);

  const [editData, setEditData] = useState(null);

  // Read
  useEffect(() => {
    axios.get('http://localhost:3003/medziai').then((res) => {
      setTrees(res.data);
    });
  }, [lastUpdate]);

  //Create
  useEffect(() => {
    if (null === createData) return;
    axios.post('http://localhost:3003/medziai', createData).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios.delete('http://localhost:3003/medziai/' + deleteData.id).then((_) => {
      setLastUpdate(Date.now());
    });
  }, [deleteData]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/medziai/' + editData.id, editData)
      .then((_) => {
        setLastUpdate(Date.now());
      });
    setLastUpdate(Date.now());
  }, [editData]);

  return (
    <TreeContext.Provider
      value={{
        trees,
        setCreateData,
        setDeleteData,
        setEditData,
        setModalData,
        modalData,
      }}
    >
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            <Create />
          </div>
          <div className='col-8'>
            <List />
          </div>
        </div>
      </div>
      <Edit />
    </TreeContext.Provider>
  );
}
export default App;
