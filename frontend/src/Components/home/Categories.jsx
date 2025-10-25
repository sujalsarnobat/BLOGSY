import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Icon,
  styled,
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Code,
  School,
  EmojiNature,
  TravelExplore,
  FitnessCenter,
  Category as DefaultIcon,
  AddCircleOutline,
} from '@mui/icons-material';

import { categories } from '../../constants/data';

const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledButton = styled(Button)`
  background-color: #6495ED;
  color: #fff;
  margin-bottom: 20px;
  padding: 10px 20px;
  text-transform: none;
`;

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  width: '100%',
  maxWidth: 400,
  transition: 'all 0.3s ease',
  borderRadius: '12px',
  boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  '&:hover': {
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    transform: 'translateY(-2px)',
  },
}));

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

const iconMap = {
  Code: <Code />,
  School: <School />,
  EmojiNature: <EmojiNature />,
  TravelExplore: <TravelExplore />,
  FitnessCenter: <FitnessCenter />,
};

const Categories = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');

  return (
    <Container>
      <StyledLink to={`/create?category=${selectedCategory || ''}`}>
        <StyledButton variant="contained" startIcon={<AddCircleOutline />}>
          Create Blog
        </StyledButton>
      </StyledLink>

      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <StyledLink to="/">
            <StyledCard>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <DefaultIcon />
                <Typography variant="subtitle1">All Categories</Typography>
              </CardContent>
            </StyledCard>
          </StyledLink>
        </Grid>

        {categories.map((cat) => (
          <Grid item xs={12} key={cat.id}>
            <StyledLink to={`/?category=${cat.type}`}>
              <StyledCard>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {iconMap[cat.icon] || <DefaultIcon />}
                  <Typography variant="subtitle1">{cat.type}</Typography>
                </CardContent>
              </StyledCard>
            </StyledLink>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;
