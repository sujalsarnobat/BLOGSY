import { AppBar, Toolbar, styled, Button, useMediaQuery, useTheme } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Component = styled(AppBar)`
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: #000;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
    position: sticky;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    
    &:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    }
`;

const Container = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 24px;
    gap: 8px;

    @media (max-width: 768px) {
        flex-direction: row;
        gap: 4px;
        padding: 0 16px;
    }
`;

const NavLinks = styled('div')`
    display: flex;
    gap: 8px;
    
    @media (max-width: 768px) {
        gap: 4px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #333;
    font-weight: 600;
    font-size: 15px;
    position: relative;
    padding: 16px 12px;
    transition: all 0.3s ease;
    border-radius: 8px;
    letter-spacing: 0.5px;

    &::after {
        content: '';
        position: absolute;
        width: 0%;
        height: 3px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 8px;
        background: linear-gradient(90deg, #1976d2, #2196f3);
        transition: width 0.3s ease-in-out;
        border-radius: 3px;
    }

    &:hover::after {
        width: 70%;
    }

    &:hover {
        color: #1976d2;
        background: rgba(25, 118, 210, 0.05);
    }

    @media (max-width: 768px) {
        padding: 12px 8px;
        font-size: 14px;
    }
`;

const LogoutButton = styled(Button)`
    background: linear-gradient(135deg, #1976d2, #2196f3);
    color: white !important;
    font-weight: 600;
    padding: 8px 20px;
    border-radius: 8px;
    text-transform: none;
    box-shadow: 0 2px 10px rgba(25, 118, 210, 0.3);
    transition: all 0.3s ease;
    margin-left: 12px;
    
    &:hover {
        background: linear-gradient(135deg, #1565c0, #1976d2);
        box-shadow: 0 4px 15px rgba(25, 118, 210, 0.4);
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        padding: 6px 16px;
        margin-left: 8px;
    }
`;

const Logo = styled('div')`
    font-weight: 700;
    font-size: 20px;
    color: #1976d2;
    display: flex;
    align-items: center;
    margin-right: 24px;
    
    span {
        background: linear-gradient(135deg, #1976d2, #2196f3);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    @media (max-width: 768px) {
        font-size: 18px;
        margin-right: 12px;
    }
`;

const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const logout = async () => navigate('/account');

    return (
        <Component>
            <Container>
                <Logo>
                    <span>BLOGSY</span>
                </Logo>
                
                <NavLinks>
                    <StyledLink to='/'>HOME</StyledLink>
                    <StyledLink to='/about'>ABOUT</StyledLink>
                    <StyledLink to='/contact'>CONTACT</StyledLink>
                    {isMobile ? (
                        <StyledLink to='/account' onClick={logout}>LOGOUT</StyledLink>
                    ) : (
                        <LogoutButton onClick={logout}>LOGOUT</LogoutButton>
                    )}
                </NavLinks>
            </Container>
        </Component>
    );
};

export default Header;