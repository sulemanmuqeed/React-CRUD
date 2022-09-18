import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import DataTable from './components/DataTable'
import ModalForm from './components/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSeashells } from './features/seashell/seashellEffects'

function App() {

  const dispatch = useDispatch()
  const items = useSelector((state) => state.seashell.value)

  useEffect(() => {
    dispatch(fetchSeashells())
  }, [])

  return (
    <Container className="App">
      <Row>
        <Col>
          <h1 style={{ margin: "20px 0" }}>Seashells Collection</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable items={items} />
        </Col>
      </Row>
      <Row>
          <Col>
            <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}/>
          </Col>
        </Row>
    </Container>
  );
}

export default App;
