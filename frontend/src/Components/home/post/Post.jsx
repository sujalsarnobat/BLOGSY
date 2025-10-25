import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 12px;
    margin: 12px;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 400px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: #fff;
    overflow: hidden;
    position: relative;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border-color: rgba(25, 118, 210, 0.2);
    }

    & > * {
        padding: 0 16px;
    }
`;

const Image = styled('img')({
    width: '100%',
    height: 180,
    objectFit: 'cover',
    marginBottom: '12px',
    transition: 'transform 0.5s ease',
    '&:hover': {
        transform: 'scale(1.03)'
    }
});

const Text = styled(Typography)`
    color: #6b7280;
    font-size: 12px;
    margin-top: 8px;
    letter-spacing: 0.3px;
`;

const CategoryText = styled(Text)`
    background: linear-gradient(135deg, #1976d2, #2196f3);
    color: white;
    display: inline-block;
    padding: 4px 10px;
    border-radius: 16px;
    margin: 12px 16px 8px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 8px 16px 4px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Details = styled(Typography)`
    font-size: 14px;
    color: #4b5563;
    word-break: break-word;
    line-height: 1.5;
    margin: 8px 16px 16px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const AuthorText = styled(Text)`
    margin: 0 16px 16px;
    display: flex;
    align-items: center;
    gap: 6px;
    
    &::before {
        content: '•';
        color: #d1d5db;
        margin-right: 4px;
    }
`;

const Post = ({ post }) => {
    const fallbackImage = 'https://images.unsplash.com/photo-1579547945413-497e1b99dac0?q=80&w=1000';
    const url = post.picture ? post.picture : fallbackImage;

    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    };

    return (
        <Container>
            <Image src={url} alt="post" />
            <CategoryText>{post.categories}</CategoryText>
            <Heading>{addEllipsis(post.title, 25)}</Heading>
            <AuthorText>Author: {post.username}</AuthorText>
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    );
};

export default Post;