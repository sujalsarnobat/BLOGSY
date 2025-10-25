import { useContext } from "react";
import { 
    Box, 
    Typography, 
    styled, 
    IconButton, 
    Tooltip,
    useTheme 
} from "@mui/material";
import { Delete } from '@mui/icons-material';
import { API } from '../../../service/api';
import { DataContext } from "../../../context/DataProvider";

const CommentContainer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    transition: 'background-color 0.2s ease',
    '&:hover': {
        backgroundColor: theme.palette.grey[200],
    },
}));

const HeaderContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
});

const UserName = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '0.875rem',
    color: theme.palette.text.primary,
}));

const CommentDate = styled(Typography)(({ theme }) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
}));

const ActionsContainer = styled(Box)({
    marginLeft: 'auto',
    display: 'flex',
    gap: 4,
});

const CommentText = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    lineHeight: 1.5,
    color: theme.palette.text.primary,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
}));

const getRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds/60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds/3600)} hours ago`;
    return `${Math.floor(diffInSeconds/86400)} days ago`;
};

const Comment = ({ comment, setToggle }) => {
    const theme = useTheme();
    const { account } = useContext(DataContext);
    
    const isUserComment = comment.name === account.username;

    const removeComment = async () => {
        try {
            await API.deleteComment(comment._id);
            setToggle(prev => !prev);
        } catch (error) {
            console.error('Failed to delete comment:', error);
        }
    };

    const formattedDate = getRelativeTime(comment.date);

    return (
        <CommentContainer>
            <HeaderContainer>
                <UserName variant="subtitle2">
                    {comment.name}
                </UserName>
                
                <CommentDate variant="caption">
                    {formattedDate}
                </CommentDate>
                
                {isUserComment && (
                    <ActionsContainer>
                        <Tooltip title="Delete comment">
                            <IconButton 
                                size="small"
                                onClick={removeComment}
                                aria-label="Delete comment"
                                sx={{
                                    color: theme.palette.error.main,
                                    '&:hover': {
                                        backgroundColor: theme.palette.error.light,
                                    },
                                }}
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </ActionsContainer>
                )}
            </HeaderContainer>
            
            <CommentText variant="body2">
                {comment.comments}
            </CommentText>
        </CommentContainer>
    );
};

export default Comment;