import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'semantic-ui-react'
import axios from 'axios';

export default function Read() {
  useEffect(() => {
   axios
    .get('http://localhost:3001/posts')
    .then(response => {
      setPosts(response.data)
    })
  }, [])

  const [posts, setPosts] = useState([])
  console.log(posts, "posts")
  return (
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                 { posts.map((post)=>{
                   return (
                    <Table.Row>
                      <Table.Cell>{post.title}</Table.Cell>
                      <Table.Cell>{post.body}</Table.Cell>
                    </Table.Row>
                  );})}
                </Table.Body>
            </Table>
        </div>
  )
}
