import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import DataTable from './components/DataTable'
import ModalForm from './components/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSeashells } from './features/seashell/seashellEffects'

function App() {

  const dispatch = useDispatch()
  const items = useSelector((state) => state.seashell.value)

  const loading = useSelector((state) => state.seashell.loading.seashells === 'pending')
  const deleting = useSelector((state) => state.seashell.loading.delete === 'pending')

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
      { deleting ? <div><Spinner animation="border" size="sm" /> Removing seashell</div> : null }
      {loading ?
        <div><Spinner animation="border" size="sm" /> Loading Seashells</div> :
        <>
          <Row>
            <Col>
              <DataTable items={items} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ModalForm buttonLabel="Add Item" />
            </Col>
          </Row>
        </>
      }
    </Container>
  );
}

export default App;
