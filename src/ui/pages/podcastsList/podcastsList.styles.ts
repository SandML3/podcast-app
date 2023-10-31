import styled from 'styled-components';

export const NumberOfResults = styled.div `   
    background-color: #3c77ab;
    color: white;
    font-weight: bolder;
    padding: 0 0.3rem;
    width: max-content;
    height: min-content;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
`

export const Form = styled.form `

    & > input {
        border: 1px solid #80808074;
        padding: 0.5rem;
        width: 15rem;
        border-radius: 5px;
    }
`

export const SearchSection = styled.div `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    margin-right: 2rem; 
    gap: 0.8rem;
`

export const PodcastsListUl = styled.ul `
    margin-top: 4rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center; 
    column-gap: 1rem;
    row-gap: 8rem;
`