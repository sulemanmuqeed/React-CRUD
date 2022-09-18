const RESOURCE_URL = 'http://localhost:3000/seashells';
const headers = {
  'Content-Type': 'application/json'
};

export const fetchSeashells = () =>
  fetch(RESOURCE_URL)
    .then(response => response.json());

export const fetchSeashell = (id) =>
  fetch(RESOURCE_URL + `\\${id}`)
    .then(response => response.json());

export const addSeashell = (data) =>
  fetch(RESOURCE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })
    .then(response => response.json())

export const updateSeashell = (id, data) =>
  fetch(RESOURCE_URL + `\\${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(data)
  })
    .then(response => response.json())

export const deleteSeashell = (id) =>
  fetch(RESOURCE_URL + `\\${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())