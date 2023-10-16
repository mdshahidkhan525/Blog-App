import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';
import axios from 'axios';
const headers = JSON.parse(localStorage.getItem('headers'));

export default function Edit({ postId, fetchPosts, closeModal }) {
  const [post, setPost] = useState({ title: '', body: '' });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`, { headers: headers })
      .then(response => {
        setPost(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [postId]);

  const handleUpdate = () => {
    axios.put(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`, post, { headers: headers })
      .then(response => {
        console.log('Post updated successfully', response.data);
        fetchPosts();
        closeModal();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <textarea
            name="body"
            value={post.body}
            onChange={handleChange}
          />
        </Form.Field>
      </Form>
      <br></br>
      <Button color="blue" onClick={handleUpdate}>
        Update
      </Button>
      <Button color="orange" onClick={closeModal}>
        Cancel
      </Button>
    </div>
  );
}
