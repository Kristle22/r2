import { useContext } from 'react';
import { useState } from 'react';
import FrontContext from './Goods/FrontContext';

function Tree({ tree }) {
  const { setCreateComments } = useContext(FrontContext);
  const [comment, setComment] = useState('');

  const handleComment = () => {
    setCreateComments({ comment, treeId: tree.id });
    setComment('');
  };

  return (
    <li className='list-group-item'>
      <div className='item-front'>
        <div className='content'>
          <b style={{ margin: '7px' }}>{tree.title}</b>
          <span>{['Leaf', 'Spike', 'Palm'][tree.type - 1]}</span>
          <i style={{ margin: '7px' }}>{tree.height.toFixed(2)}</i>
          <u style={{ margin: '10px', color: 'yellowGreen' }}>{tree.good}</u>
        </div>
        <div className='form-group' style={{ width: '100%' }}>
          <label>Add your comment here</label>
          <textarea
            className='form-control'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows='3'
          ></textarea>
        </div>
        <div className='buttons'>
          <button
            type='button'
            className='btn btn-outline-success ml-2'
            onClick={handleComment}
          >
            Send
          </button>
        </div>
        <ul>
          {tree.coms
            ? tree.coms
                .slice(0, -5)
                .split('-^o^-,')
                .map((c, i) => <li key={i}>{c}</li>)
            : null}
        </ul>
      </div>
    </li>
  );
}

export default Tree;
