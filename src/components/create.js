import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'

export default function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const postData = () => {
    console.log(title);
    console.log(description);
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
