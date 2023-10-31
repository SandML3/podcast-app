import { Link } from 'react-router-dom';
import { Nav, Title } from './header.styles';

function Header() {
    return (
        <Nav>
            <Link to='/'><Title>Podcaster</Title></Link>
        </Nav>
    )
}

export default Header;