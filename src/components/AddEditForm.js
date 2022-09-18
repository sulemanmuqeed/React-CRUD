import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, FormLabel, FormControl, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'
import { addSeashell, updateSeashell } from '../features/seashell/seashellEffects';
import { resetSubmitState } from '../features/seashell/seashellSlice';

function AddEditForm(props) {

  const dispatch = useDispatch();

  const [form, setValues] = useState({
    id: 0,
    name: '',
    species: '',
    description: '',
  })

  const [addAnother, setAddAnother] = useState(false)

  const isSubmitting = useSelector((state) => state.seashell.loading.submit === 'pending')
  const isCompleted = useSelector((state) => state.seashell.loading.submit === 'completed')

  useEffect(() => {
    if (isCompleted) {
      if (addAnother) {
        setValues({
          id: 0,
          name: '',
          species: '',
          description: '',
        })
      } else {
        props.toggle()
      }
      dispatch(resetSubmitState())
    }
  }, [isCompleted])

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    e.preventDefault()
    dispatch(addSeashell(getFormData()))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    const data = getFormData();
    dispatch(updateSeashell({ id: form.id, data }))
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
        <FormControl type="text" name="name" onChange={onChange} value={form.name === null ? '' : form.name} required />
      </FormGroup>
      <FormGroup className="mb-3" controlId="species">
        <FormLabel>Species</FormLabel>
        <FormControl type="text" name="species" onChange={onChange} value={form.species === null ? '' : form.species} required />
      </FormGroup>
      <FormGroup className="mb-3" controlId="description">
        <FormLabel>Description</FormLabel>
        <FormControl as="textarea" rows={3} name="description" onChange={onChange} value={form.description === null ? '' : form.description} required />
      </FormGroup>
      <Button type="submit" onClick={() => setAddAnother(false)} className="me-3">Submit</Button>
      {!props.item ? <Button type="submit" onClick={() => setAddAnother(true)}>Save and add another</Button> : null}
      {isSubmitting ? (<div><Spinner animation="border" size="sm" /> Saving please wait</div>) : null}
    </Form>
  );
}

export default AddEditForm;
