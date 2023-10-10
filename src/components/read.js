import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Modal } from 'semantic-ui-react'
import axios from 'axios';
import Create from './create';

export default function Read() {
  const [posts, setPosts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get('http://localhost:3001/posts')
      .then(response => {
        setPosts(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleDelete = (postId) => {
    axios.delete(`http://localhost:3001/posts/${postId}`)
      .then(response => {
        console.log('Post deleted successfully', response.data);
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const newPost = () => {
    setIsCreateModalOpen(true);
  }

  const closeModal = () => {
    setIsCreateModalOpen(false);
  }

  return (
    <div>
      <div>
        <Button color="green" onClick={() => newPost()}>
           New Post
        </Button>
      </div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Post ID</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {posts.map((post) => {
            return (
              <Table.Row key={post.id}>
                <Table.Cell>{post.id}</Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.body}</Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => handleDelete(post.id)}>
                    Delete Post
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Modal open={isCreateModalOpen} onClose={closeModal}>
        <Modal.Header>Add New Post</Modal.Header>
        <Modal.Content>
          <div>
           <Create setIsCreateModalOpen={setIsCreateModalOpen} fetchPosts={fetchPosts}/>
          </div>
          <Button color="orange" onClick={closeModal}>Cancel</Button>
        </Modal.Content>
      </Modal>
    </div>
  )
}
