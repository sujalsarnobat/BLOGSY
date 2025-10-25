import { useState, useEffect, useContext } from 'react';
import { Box, TextareaAutosize, Button, styled, Typography, Avatar } from '@mui/material';
import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';
import Comment from './Comment';

// Enhanced styled components
const Container = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    gap: theme.spacing(2),
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
}));

const CommentsContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
}));

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
    minHeight: 100,
    width: '100%',
    padding: theme.spacing(1.5),
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    resize: 'none',
    '&:focus': {
        outline: 'none',
        borderColor: theme.palette.primary.main,
        boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
    },
    '&::placeholder': {
        color: theme.palette.text.disabled,
    },
}));

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
};

const Comments = ({ post }) => {
    const defaultAvatarUrl = 'https://static.thenounproject.com/png/12017-200.png';
    const [comment, setComment] = useState(initialValue);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { account } = useContext(DataContext);

    const localStorageKey = `comment-draft-${post._id}`;

    useEffect(() => {
        const draft = localStorage.getItem(localStorageKey);
        if (draft) {
            setComment(JSON.parse(draft));
        }
    }, [post, localStorageKey]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };
        getData();
    }, [toggle, post]);

    const handleChange = (e) => {
        const updatedComment = {
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value,
            date: new Date()
        };
        setComment(updatedComment);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedComment));
    };

    const addComment = async () => {
        if (!comment.comments.trim()) return;

        setIsSubmitting(true);
        try {
            await API.newComment(comment);
            setComment(initialValue);
            localStorage.removeItem(localStorageKey);
            setToggle(prev => !prev);
        } catch (error) {
            console.error('Failed to post comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addComment();
        }
    };

    return (
        <Box component="section" aria-label="Comments section">
            <Typography variant="h6" component="h2" gutterBottom>
                Comments ({comments.length})
            </Typography>
            
            <Container>
                <Avatar 
                    src={account.picture || defaultAvatarUrl} 
                    alt={account.username} 
                    sx={{ width: 56, height: 56 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    <StyledTextArea 
                        minRows={3}
                        maxRows={8}
                        placeholder="What's on your mind?"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={comment.comments}
                        disabled={isSubmitting}
                        aria-label="Add a comment"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            size="medium"
                            onClick={addComment}
                            disabled={!comment.comments.trim() || isSubmitting}
                            sx={{ 
                                minWidth: 120,
                                textTransform: 'none',
                                fontWeight: 'medium'
                            }}
                        >
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </Button>
                    </Box>
                </Box>
            </Container>

            <CommentsContainer>
                {comments.length > 0 ? (
                    comments.map(comment => (
                        <Comment key={comment._id} comment={comment} setToggle={setToggle} />
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary" align="center" py={4}>
                        No comments yet. Be the first to share your thoughts!
                    </Typography>
                )}
            </CommentsContainer>
        </Box>
    );
};

export default Comments;