import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'
import axios from 'axios';

export default function Create({setIsCreateModalOpen, fetchPosts, closeModal}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const postData = () => {
   axios
      .post('http://localhost:3001/posts', {
        title: title,
        body: description
      })
      .then(response => {
        console.log('Post created successful:', response.data);
        fetchPosts();
        setIsCreateModalOpen(false);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}
  return (
      <div>
          <Form>
              <Form.Field>
                  <label>Title</label>
                  <input placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
              </Form.Field>
              <Form.Field>
                  <label>Description</label>
                  <textarea placeholder='Description' onChange={(e) => setDescription(e.target.value)}></textarea>
              </Form.Field>
              <div className='button-div'>
                <Button color="red" onClick={closeModal}>Cancel</Button>
                <Button color="green" onClick={postData} type='submit'>Create</Button>
              </div>
          </Form>
      </div>
  )
}
