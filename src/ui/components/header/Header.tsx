import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import { Nav, Title } from './header.styles';

type HeaderProps = {
    isLoading: boolean;
}

function Header({isLoading}: HeaderProps) {
    return (
        <Nav id="header">
            <Link to='/'><Title>Podcaster</Title></Link>
            {isLoading && <Spinner/>}
        </Nav>
    )
}

export default Header;