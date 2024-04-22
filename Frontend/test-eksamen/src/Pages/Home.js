import { useEffect, useState } from 'react';
import { useAuthContext } from "../hooks/useAuthContext";

// components
import BlogForm from '../components/BlogForm'; 
import Navbar from '../components/Navbar';
import { useLatestPosts } from '../hooks/useLatestPosts';

import styled from 'styled-components';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useDeletePost } from '../hooks/useDeletePost';

// Styled components
const Box = styled.div`
border: 2px solid #333;
padding: 20px;
margin: 20px auto;
background-color: #f0f0f0;
border-radius: 8px;
max-width: 600px; /* Set the maximum width to 120 characters */
word-wrap: break-word; /* Wrap words if they exceed the container width */
`;

const BoxTitle = styled.h1`
font-size: 20px;
font-weight: bold;
margin-bottom: 10px;
`;

const BoxText = styled.p`
font-size: 16px;
`;

const DeleteButton = styled.span`
  background-color: #ff0000; /* Red background */
  color: #ffffff; /* White text */
  padding: 8px 16px; /* Padding around the button text */
  border: none; /* No border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Cursor style on hover */
  font-size: 16px; /* Font size */
  transition: background-color 0.3s ease; /* Smooth color transition on hover */
  background-color: #cc0000; /* Darker red on hover */

`;

const Home = () => {
  const { user } = useAuthContext();

  const { latestPosts, blogs, isLoading, error } = useLatestPosts()
  const { handleClick, data} = useDeletePost()

  useEffect(() => {
    latestPosts()
  },[])

  return (
    <>
    

    <div className="home">
      <div className="blogs">
        {blogs && blogs.map((blog) => (
          <Box>
            <BoxTitle>{blog?.title}</BoxTitle>
            <h4>{blog?.author}</h4>
            <BoxText>{blog?.body}</BoxText>
            <p>{formatDistanceToNow(new Date(blog?.createdAt), { addSuffix: true })}</p>
            <DeleteButton onClick={() => handleClick(blog?._id)}>delete</DeleteButton>
          </Box>
        ))}
      </div>
      <BlogForm /> 
    </div>
    </>
  );
};

export default Home;
