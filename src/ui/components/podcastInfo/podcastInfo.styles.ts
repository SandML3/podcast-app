import { Link } from "react-router-dom";
import styled from 'styled-components';

export const Card = styled.div `
    width: 25%;
    max-width: 450px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    box-shadow: -2px 5px 10px -3px rgba(156, 156, 156, 0.721);
    height: max-content;
    margin: 1rem;
    
    & img {
        width: 80%;
        max-width: 300px;
        border-radius: 8px;
        place-self: center;
        margin: 1rem auto;
    }

    & > :nth-child(2) {
        border-top: 2px solid #6f8ca529;
        border-bottom: 2px solid #6f8ca529;
        padding: 1rem 0.5rem;
        text-decoration: none;
        color: black;
    }
`
export const StyledReactLink = styled(Link) `
    display: flex;
`

export const Title = styled.p `
    font-weight: bolder;
    margin-bottom: 0;
`

export const Author = styled.p `
    font-style: italic; 
    margin-top: 0.5rem;
`

export const DescriptionLabel = styled.p `
    font-weight: bolder;
    line-height: 0rem;
`

export const Description = styled.article `
    color: #454545;
    padding-top: 1rem;
`