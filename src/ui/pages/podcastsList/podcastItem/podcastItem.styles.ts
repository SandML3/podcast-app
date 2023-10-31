import styled from 'styled-components';

export const PodcastContainer = styled.div `   
    width: max-content;
    height: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    position: relative;
    padding: 4rem 0.5rem 0;
    box-shadow: -2px 5px 10px -3px rgba(156, 156, 156, 0.721);
    width: 15rem;
`

export const PodcastImage = styled.img `
    height: 130px;
    width: 130px;
    border-radius: 50%;
    position: absolute;
    bottom: 60%;
`

export const PodcastTitle = styled.h2 `
    text-transform: uppercase;
    font-size: 1.3rem;
    font-weight: 500;
    margin-bottom: 0;
    max-width: 90%;
    text-align: center;
    max-height: 50px;
    overflow: hidden;
`

export const PodcastAuthor = styled.p `
    font-weight: 500;
    color: rgb(114, 114, 114);
    max-width: 90%;
    text-align: center;
`