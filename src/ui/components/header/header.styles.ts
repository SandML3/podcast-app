import styled from 'styled-components';

export const Title = styled.h1 `   
    color: #3c77ab;
    height: 1.2rem;
    font-weight: 500;
    font-size: 1.5rem;
    padding-left: 0.5rem;
`

export const Nav = styled.nav `
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
    border-bottom: 2.3px solid #6f8ca529;
    margin: 1rem 0.5rem;

    & > a {
        text-decoration: none;
    }
`