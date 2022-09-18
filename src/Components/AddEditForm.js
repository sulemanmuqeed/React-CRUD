import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

function AddEditForm(props) {
  const [form, setValues] = useState({
    id: 0,
    name: '',
    species: '',
    description: '',
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/seashells', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        species: form.species,
        description: form.description,
      })
    })
      .then(response => response.json())
      .then(item => {
        if (item.hasOwnProperty('id')) {
          props.addItemToState(item)
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    const data = getFormData();
    fetch('http://localhost:3000/seashells/' + form.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(item => {
        if (item.affected) {
          props.updateState(data)
          props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  const getFormData = () => {
    return {
      id: form.id,
      name: form.name,
      species: form.species,
      description: form.description,
    };
  }

  useEffect(() => {
    if (props.item) {
      const { id, name, description, species } = props.item
      setValues({ id, name, description, species })
    }
  }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup className="mb-3" controlId="name">
        <FormLabel>Name</FormLabel>
        <FormControl type="text" name="name" onChange={onChange} value={form.name === null ? '' : form.name} />
      </FormGroup>
      <FormGroup className="mb-3" controlId="species">
        <FormLabel>Species</FormLabel>
        <FormControl type="text" name="species" onChange={onChange} value={form.species === null ? '' : form.species} />
      </FormGroup>
      <FormGroup className="mb-3" controlId="description">
        <FormLabel>Description</FormLabel>
        <FormControl type="text" name="description" onChange={onChange} value={form.description === null ? '' : form.description} />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export default AddEditForm;
