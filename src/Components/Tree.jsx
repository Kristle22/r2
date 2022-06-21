import { useContext } from 'react';
import TreeContext from './TreeContext';

function Tree({ tree }) {
  const { setDeleteData, setModalData } = useContext(TreeContext);

  const handleDelete = () => {
    setDeleteData(tree);
  };

  const handleModal = () => {
    setModalData(tree);
  };
  console.log(tree.good);

  return (
    <li className='list-group-item'>
      <div className='item'>
        <div className='content'>
          <b>{tree.title}</b>
          <span>{['Leaf', 'Spike', 'Palm'][tree.type - 1]}</span>
          <i>{tree.height}</i>
          <u style={{ marginLeft: '10px' }}>{tree.good}</u>
        </div>
        <div className='buttons'>
          <button
            type='button'
            className='btn btn-outline-success ml-2'
            onClick={handleModal}
          >
            Edit
          </button>
          <button
            type='button'
            className='btn btn-outline-danger ml-2'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default Tree;
