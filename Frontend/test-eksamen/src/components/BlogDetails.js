import styled from 'styled-components';


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


const BlogDetails = ( {blog} ) => {
    return(
        <Box>
            <BoxTitle>{blog.title}</BoxTitle>
            <h4>{blog.author}</h4>
            <BoxText>{blog.body}</BoxText>
            <p>{blog.createdAt}</p>
        </Box>
    )

}

export default BlogDetails