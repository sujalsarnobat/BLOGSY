import { Box, styled, useTheme } from '@mui/material';
import Banner from '../banner/Banner';
import Categories from './Categories';
import Posts from './post/Posts';

const HomeContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  minHeight: '100vh',
  overflowX: 'hidden',
}));

const MainContent = styled(Box)(({ theme }) => ({
  maxWidth: '1500px',
  margin: '32px auto 0',
  padding: '0 24px',
  display: 'flex',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
    padding: '0 16px',
    gap: theme.spacing(3),
  }
}));

const Sidebar = styled(Box)(({ theme }) => ({
  width: '300px',
  position: 'sticky',
  top: '100px',
  height: 'fit-content',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  padding: theme.spacing(3),
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    position: 'static',
    padding: theme.spacing(2),
    boxShadow: 'none',
    border: `1px solid ${theme.palette.divider}`,
  }
}));

const PostsContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
  }
}));

const StyledBanner = styled(Banner)(({ theme }) => ({
  marginBottom: theme.spacing(-4),
  [theme.breakpoints.down('md')]: {
    marginBottom: 0,
  }
}));

const Home = () => {
  const theme = useTheme();

  return (
    <HomeContainer>
      <StyledBanner />
      
      <MainContent>
        <Sidebar>
          <Categories />
        </Sidebar>
        
        <PostsContainer>
          <Posts />
        </PostsContainer>
      </MainContent>
    </HomeContainer>
  );
}

export default Home;