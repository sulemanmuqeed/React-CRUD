import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AddEditForm from './AddEditForm';

function ModalForm(props) {
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const label = props.buttonLabel

  let button = ''
  let title = ''

  if (label === 'Edit') {
    button = <Button
      variant="warning"
      onClick={toggle}
      style={{ float: "left", marginRight: "10px" }}>{label}
    </Button>
    title = 'Edit Item'
  } else {
    button = <Button
      variant="success"
      onClick={toggle}
      style={{ float: "left", marginRight: "10px" }}>{label}
    </Button>
    title = 'Add New Item'
  }


  return (
    <div>
      {button}
      <Modal show={modal} onHide={toggle} className={props.className}>
        <Modal.Header closeButton={true}><Modal.Title>{title}</Modal.Title></Modal.Header>
        <Modal.Body>
          <AddEditForm
            toggle={toggle}
            item={props.item} />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ModalForm