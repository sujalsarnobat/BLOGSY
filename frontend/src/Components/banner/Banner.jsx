import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
  width: 95%;
  margin: 2rem auto;
  height: 70vh;
  background-image: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)),
    url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1673&q=80');
  background-size: cover;
  background-position: center;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
  transition: all 0.5s ease;

  /* Animation */
  animation: fadeInUp 1s ease-out;

  /* Subtle overlay effect */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 0;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    height: 50vh;
    padding: 1.5rem;
    border-radius: 16px;
    width: 90%;
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ContentWrapper = styled(Box)`
  position: relative;
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
`;

const Heading = styled(Typography)`
  font-size: 4.5rem;
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
`;

const SubHeading = styled(Typography)`
  font-size: 1.4rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 0;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Banner = () => {
    return (
        <Image>
            <ContentWrapper>
                <Heading variant="h1">Blogsy</Heading>
                <SubHeading variant="subtitle1">
                    Craft your stories with style and share your voice with the world
                </SubHeading>
            </ContentWrapper>
        </Image>
    )
}

export default Banner;