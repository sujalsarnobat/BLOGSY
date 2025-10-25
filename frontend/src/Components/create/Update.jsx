import React, { useState, useEffect } from 'react';
import { 
    Box, 
    styled, 
    TextareaAutosize, 
    Button, 
    FormControl, 
    InputBase,
    Typography,
    CircularProgress,
    IconButton,
    useTheme
} from '@mui/material';
import { AddPhotoAlternate as AddPhotoIcon, Save as SaveIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: theme.spacing(6, 12),
    [theme.breakpoints.down('md')]: {
        margin: theme.spacing(4, 2),
    },
}));

const PostImage = styled('img')(({ theme }) => ({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    marginBottom: theme.spacing(4),
}));

const FormContainer = styled(FormControl)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing(2),
    margin: theme.spacing(3, 0),
}));

const TitleInput = styled(InputBase)(({ theme }) => ({
    flex: 1,
    fontSize: '1.5rem',
    fontWeight: 600,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    '&:focus': {
        borderColor: theme.palette.primary.main,
    },
}));

const ContentTextArea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    minHeight: '300px',
    fontSize: '1rem',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(3, 0),
    resize: 'vertical',
    '&:focus': {
        outline: 'none',
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
}));

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
};

const Update = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const defaultImage = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    setPost(response.data);
                } else {
                    setError('Failed to load post');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching post:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const uploadImage = async () => { 
            if (file) {
                setIsLoading(true);
                try {
                    const data = new FormData();
                    data.append("name", file.name);
                    data.append("file", file);
                    
                    const response = await API.uploadFile(data);
                    if (response.isSuccess) {
                        const imageUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/files/${file.name}`;
                        setPost(prev => ({ ...prev, picture: imageUrl }));
                    }
                } catch (err) {
                    console.error('Error uploading image:', err);
                    setError('Failed to upload image');
                } finally {
                    setIsLoading(false);
                }
            }
        };
        uploadImage();
    }, [file]);

    const handleUpdatePost = async () => {
        if (!post.title.trim() || !post.description.trim()) {
            setError('Title and content cannot be empty');
            return;
        }

        setIsUpdating(true);
        try {
            await API.updatePost(post);
            navigate(`/details/${id}`);
        } catch (err) {
            console.error('Error updating post:', err);
            setError('Failed to update post');
        } finally {
            setIsUpdating(false);
        }
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Container>
            <PostImage 
                src={post.picture || defaultImage} 
                alt={post.title || 'Post image'} 
                onError={(e) => {
                    e.target.src = defaultImage;
                }}
            />

            <FormContainer>
                <input
                    accept="image/*"
                    type="file"
                    id="post-image-upload"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="post-image-upload">
                    <IconButton color="primary" component="span" aria-label="Upload image">
                        <AddPhotoIcon fontSize="large" />
                    </IconButton>
                </label>

                <TitleInput
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Post title"
                    fullWidth
                    required
                />

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={handleUpdatePost}
                    disabled={isUpdating || !post.title.trim() || !post.description.trim()}
                >
                    {isUpdating ? (
                        <>
                            <CircularProgress size={24} color="inherit" />
                            <Box component="span" ml={1}>Updating...</Box>
                        </>
                    ) : 'Update Post'}
                </Button>
            </FormContainer>

            {error && (
                <Typography color="error" variant="body2" mb={2}>
                    {error}
                </Typography>
            )}

            <ContentTextArea
                minRows={10}
                name="description"
                value={post.description}
                onChange={handleChange}
                placeholder="Write your post content here..."
                required
            />
        </Container>
    );
};

export default Update;