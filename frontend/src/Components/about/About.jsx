import { Box, styled, Typography, Link, Divider } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Banner = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80)',
  width: '100%',
  minHeight: '100vh',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  borderBottom: `4px solid ${theme.palette.primary.main}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 20px',
}));

const Wrapper = styled(Box)(({ theme }) => ({
  maxWidth: '900px',
  textAlign: 'center',
  color: '#fff',
}));

const Name = styled(Typography)(({ theme }) => ({
  fontSize: '38px',
  fontWeight: 700,
  marginBottom: '12px',
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.grey[300],
  marginBottom: '24px',
}));

const ContactIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '24px',
  marginBottom: '40px',
}));

const IconLink = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[100],
  transition: 'color 0.3s, transform 0.3s',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateY(-4px)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  color: theme.palette.primary.main,
  margin: '40px 0 10px',
  textAlign: 'left',
}));

const Text = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: theme.palette.grey[100],
  lineHeight: 1.7,
  marginBottom: '24px',
  textAlign: 'left',
}));

const About = () => {
  return (
    <Banner>
      <Wrapper>
        <Name>Hi, I'm Sujal Sarnobat</Name>
        <Subtitle>Full Stack Developer | Tech Explorer | Bangalore, India</Subtitle>

        <ContactIcons>
          <IconLink href="https://github.com/sujalsarnobat" target="_blank" rel="noopener noreferrer">
            <GitHub fontSize="large" />
          </IconLink>
          <IconLink href="https://www.linkedin.com/in/sujal-sarnobat-b428272b1/" target="_blank" rel="noopener noreferrer">
            <LinkedIn fontSize="large" />
          </IconLink>
          <IconLink href="mailto:sujalsarnobat@gmail.com" target="_blank" rel="noopener noreferrer">
            <Email fontSize="large" />
          </IconLink>
        </ContactIcons>

        <Box textAlign="left">
          <SectionTitle>About Me</SectionTitle>
          <Text>
            I'm a curious and passionate full stack developer with experience in building modern web applications using the MERN stack and other technologies. I enjoy transforming ideas into clean, scalable, and efficient software solutions.
          </Text>

          <SectionTitle>Tech Stack</SectionTitle>
          <Text>
            <strong>Frontend:</strong> React, HTML, CSS, JavaScript, Material UI<br />
            <strong>Backend:</strong> Node.js, Express<br />
            <strong>Database:</strong> MongoDB<br />
            <strong>Tools:</strong> Git, GitHub, VS Code, Postman
          </Text>

          <Divider sx={{ my: 4, backgroundColor: '#666' }} />

          <Text sx={{ textAlign: 'center', fontStyle: 'italic', color: '#ccc' }}>
            "Let's build something amazing together."
          </Text>
        </Box>
      </Wrapper>
    </Banner>
  );
};

export default About;
