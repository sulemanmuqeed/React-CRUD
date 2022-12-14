import React from 'react'
import { Table, Button } from 'react-bootstrap'
import ModalForm from './Modal'
import { useDispatch } from 'react-redux'
import { deleteSeashell } from '../features/seashell/seashellEffects'

function DataTable(props) {

  const dispatch = useDispatch()

  const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      dispatch(deleteSeashell(id))
    }
  }

  const items = props.items.map(item => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.species}</td>
        <td className='text-truncate' style={{maxWidth: 300}}>{item.description}</td>
        <td>
          <div style={{ width: "110px" }}>
            <ModalForm buttonLabel="Edit" item={item} />
            {' '}
            <Button variant="danger" onClick={() => deleteItem(item.id)}>Del</Button>
          </div>
        </td>
      </tr>
    )
  });

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Species</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>
  );
}

export default DataTable;
