import { Link } from 'react-router-dom';
import { Nav, Title } from './header.styles';
import Spinner from '../spinner/Spinner';

type HeaderProps = {
    isLoading: boolean;
}

function Header({isLoading}: HeaderProps) {
    return (
        <Nav>
            <Link to='/'><Title>Podcaster</Title></Link>
            {isLoading && <Spinner/>}
        </Nav>
    )
}

export default Header;