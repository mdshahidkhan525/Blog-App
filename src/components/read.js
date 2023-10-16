import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Modal } from 'semantic-ui-react';
import axios from 'axios';
import Create from './create';
import Edit from './edit';
import SearchPost from './search_post';
import ReactPaginate from 'react-paginate';
import { makeStyles } from '@mui/styles';

export default function Read() {
  const [posts, setPosts] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage] = useState(8);
  const classes = useStyles();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/posts`, { headers: JSON.parse(localStorage.getItem('headers')) })
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleDelete = (postId) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`)
      .then(response => {
        console.log('Post deleted successfully', response.data);
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleEdit = (postId) => {
    // Set the post ID to be edited and open the edit modal
    setEditPostId(postId);
    setIsEditModalOpen(true);
  }

  const newPost = () => {
    setIsCreateModalOpen(true);
  }

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setEditPostId(null);
  }

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      <div>
        <SearchPost />
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
          {currentPosts.map((post) => {
            return (
              <Table.Row key={post.id}>
                <Table.Cell>{post.id}</Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.body}</Table.Cell>
                <Table.Cell>
                  <Button color="red" onClick={() => handleDelete(post.id)}>
                    Delete
                  </Button>
                  <Button color="blue" onClick={() => handleEdit(post.id)}>
                    Edit
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      {/* modal for create pop up */}
      <Modal open={isCreateModalOpen} onClose={closeModal}>
        <Modal.Header>Add New Post</Modal.Header>
        <Modal.Content>
          <Create setIsCreateModalOpen={setIsCreateModalOpen} fetchPosts={fetchPosts} closeModal={closeModal} />
        </Modal.Content>
      </Modal>

      {/* modal for edit post */}
      <Modal open={isEditModalOpen} onClose={closeModal}>
        <Modal.Header>Edit Post</Modal.Header>
        <Modal.Content>
          <div>
            <Edit postId={editPostId} fetchPosts={fetchPosts} closeModal={closeModal} />
          </div>
        </Modal.Content>
      </Modal>

      {/* Pagination Controls */}
      <div className={classes.pagination}>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={Math.ceil(posts.length / postsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(selected) => setCurrentPage(selected.selected)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
}
const useStyles = makeStyles({
  pagination: {
    paddingTop: '10px',
    textAlign: 'center',
    "& li": {
      color: "red",
      margin: '2px',
      display: "inline",
      padding: "10px",
      border: "1px solid black",
      "& a": {
        color: "#2185d0"
      }
    }
  }
});
