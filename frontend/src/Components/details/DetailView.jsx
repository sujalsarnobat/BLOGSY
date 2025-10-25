import { useState, useEffect, useContext } from 'react';
import { 
    Box, 
    Typography, 
    styled, 
    IconButton, 
    Tooltip,
    useTheme,
    Divider,
    CircularProgress
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

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

const ActionButton = styled(IconButton)(({ theme }) => ({
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    },
}));

const PostHeader = styled(Typography)(({ theme }) => ({
    fontSize: '2.5rem',
    fontWeight: 700,
    textAlign: 'center',
    margin: theme.spacing(6, 0, 2),
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1.8rem',
    },
}));

const AuthorInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: theme.spacing(3, 0),
    flexWrap: 'wrap',
    gap: theme.spacing(1),
}));

const PostContent = styled(Typography)(({ theme }) => ({
    fontSize: '1.1rem',
    lineHeight: 1.8,
    marginBottom: theme.spacing(4),
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
}));

const DetailView = () => {
    const theme = useTheme();
    const defaultImage = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';
    
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { account } = useContext(DataContext);

    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await API.getPostById(id);
                if (response.isSuccess) {
                    const postWithLocalImage = {
                        ...response.data,
                        picture: response.data.picture?.includes('http') 
                            ? response.data.picture 
                            : `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/files/${response.data.picture}`
                    };
                    setPost(postWithLocalImage);
                } else {
                    setError('Failed to load post');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching post:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const deleteBlog = async () => {  
        try {
            await API.deletePost(post._id);
            navigate('/');
        } catch (err) {
            console.error('Error deleting post:', err);
            // You might want to show an error notification here
        }
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
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

    if (!post) {
        return null;
    }

    return (
        <Container>
            <PostImage 
                src={post.picture || defaultImage} 
                alt={post.title || 'Blog post image'} 
                onError={(e) => {
                    e.target.src = defaultImage;
                }}
            />
            
            <Box sx={{ float: 'right' }}>
                {account.username === post.username && (
                    <Box>
                        <Tooltip title="Edit post">
                            <Link to={`/update/${post._id}`}>
                                <ActionButton color="primary" aria-label="Edit post">
                                    <Edit fontSize="small" />
                                </ActionButton>
                            </Link>
                        </Tooltip>
                        <Tooltip title="Delete post">
                            <ActionButton 
                                color="error" 
                                onClick={deleteBlog}
                                aria-label="Delete post"
                            >
                                <Delete fontSize="small" />
                            </ActionButton>
                        </Tooltip>
                    </Box>
                )}
            </Box>

            <PostHeader variant="h1">
                {post.title}
            </PostHeader>

            <AuthorInfo>
                <Link 
                    to={`/?username=${post.username}`} 
                    style={{ 
                        textDecoration: 'none', 
                        color: 'inherit',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    <Typography variant="subtitle1">
                        By <Box component="span" fontWeight="600">{post.username}</Box>
                    </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                    Published on {formatDate(post.createdDate)}
                </Typography>
            </AuthorInfo>

            <Divider sx={{ my: 3 }} />

            <PostContent>
                {post.description}
            </PostContent>

            <Comments post={post} />
        </Container>
    );
};

export default DetailView;