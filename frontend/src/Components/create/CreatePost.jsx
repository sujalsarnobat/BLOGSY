import React, { useState, useEffect, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
  margin: '40px auto',
  maxWidth: '900px',
  padding: '32px',
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  [theme.breakpoints.down('md')]: {
    padding: '24px',
    margin: '20px',
    borderRadius: '12px'
  },
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    margin: '10px',
    borderRadius: '8px'
  }
}));

const Image = styled('img')({
  width: '100%',
  height: '400px',
  objectFit: 'cover',
  borderRadius: '12px',
  marginBottom: '32px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
  },
  '@media (max-width: 768px)': {
    height: '250px',
    borderRadius: '8px'
  }
});

const StyledFormControl = styled(FormControl)`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

const InputTextField = styled(InputBase)`
  flex: 1;
  font-size: 28px;
  font-weight: 700;
  color: #2d3748;
  padding: 8px 16px;
  border-radius: 8px;
  background: rgba(237, 242, 247, 0.5);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(237, 242, 247, 0.8);
  }

  &:focus {
    background: #ffffff;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 32px;
  font-size: 18px;
  line-height: 1.6;
  padding: 16px;
  border-radius: 8px;
  background: rgba(237, 242, 247, 0.5);
  min-height: 300px;
  resize: none;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: #ffffff;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
  }

  &::placeholder {
    color: #718096;
    opacity: 0.6;
  }
`;

const PublishButton = styled(Button)`
  background: linear-gradient(135deg, #4299e1, #3182ce);
  color: white;
  padding: 10px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  text-transform: none;
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #3182ce, #2b6cb0);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(66, 153, 225, 0.4);
  }
`;

const AddImageButton = styled('label')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #edf2f7, #e2e8f0);
  cursor: pointer;
  transition: all 0.3s ease;
  color: #4a5568;

  &:hover {
    background: linear-gradient(135deg, #e2e8f0, #cbd5e0);
    transform: scale(1.05);
    color: #2d3748;
  }

  & svg {
    font-size: 32px;
  }
`;

const initialPost = {
  title: '',
  description: '',
  picture: '',
  username: '',
  categories: '',
  createdDate: new Date()
}

const CreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState('');
  const { account } = useContext(DataContext);

  const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        
        if (response?.isSuccess) {
          setPost(prev => ({ ...prev, picture: response.data.imageUrl }));
        }
      }
    };

    getImage();

    setPost(prev => ({
      ...prev,
      categories: location.search?.split('=')[1] || 'All',
      username: account.username
    }));
  }, [file]);

  const savePost = async () => {
    await API.createPost(post);
    navigate('/');
  }

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }

  return (
    <Container>
      <Image src={url} alt="post" />

      <StyledFormControl>
        <AddImageButton htmlFor="fileInput">
          <Add fontSize="large" />
        </AddImageButton>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField 
          onChange={(e) => handleChange(e)} 
          name='title' 
          placeholder="Title" 
        />
        <PublishButton onClick={() => savePost()} variant="contained">
          Publish
        </PublishButton>
      </StyledFormControl>

      <Textarea
        minRows={10}
        placeholder="Tell your story..."
        name='description'
        onChange={(e) => handleChange(e)} 
      />
    </Container>
  )
}

export default CreatePost;