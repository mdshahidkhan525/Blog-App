import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const postData = () => {
   axios
      .post('http://localhost:3001/posts', {
        title: title,
        body: description
      })
      .then(response => {
        console.log('Post created successful:', response.data);
        navigate('/read');
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
  return (
      <div>
          <Form className="create-form">
              <Form.Field>
                  <label>Title</label>
                  <input placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
              </Form.Field>
              <Form.Field>
                  <label>Description</label>
                  <input placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
              </Form.Field>
              <Button onClick={postData} type='submit'>Submit</Button>
          </Form>
      </div>
  )
}
