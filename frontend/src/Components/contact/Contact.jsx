import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';

const Banner = styled(Box)(({ theme }) => ({
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
        url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1470&q=80')`,
    width: '100%',
    height: '50vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `4px solid ${theme.palette.primary.main}`
}));

const BannerTitle = styled(Typography)(({ theme }) => ({
    color: '#fff',
    fontSize: '40px',
    fontWeight: 700,
    textAlign: 'center',
}));

const Wrapper = styled(Box)(({ theme }) => ({
    padding: '40px 20px',
    maxWidth: '800px',
    margin: 'auto',
    textAlign: 'center',
}));

const Text = styled(Typography)(({ theme }) => ({
    color: '#444',
    fontSize: '18px',
    lineHeight: 1.7,
    marginTop: '20px'
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '30px',
}));

const IconLink = styled(Link)(({ theme }) => ({
    color: theme.palette.grey[800],
    transition: 'transform 0.3s, color 0.3s',
    '&:hover': {
        color: theme.palette.primary.main,
        transform: 'translateY(-4px)',
    }
}));

const Contact = () => {
    return (
        <Box>
            <Banner>
                <BannerTitle>Let's Connect!</BannerTitle>
            </Banner>
            <Wrapper>
                <Text>
                    I’m always open to discussing new projects, ideas, or collaborations — or just chatting about technology and development!
                </Text>

                <IconWrapper>
                    <IconLink href="https://github.com/sujalsarnobat" target="_blank" rel="noopener">
                        <GitHub fontSize="large" />
                    </IconLink>
                    <IconLink href="https://www.linkedin.com/in/sujal-sarnobat-b428272b1/" target="_blank" rel="noopener">
                        <LinkedIn fontSize="large" />
                    </IconLink>
                    <IconLink href="mailto:sujalsarnobat@gmail.com" target="_blank" rel="noopener">
                        <Email fontSize="large" />
                    </IconLink>
                </IconWrapper>
            </Wrapper>
        </Box>
    );
};

export default Contact;
