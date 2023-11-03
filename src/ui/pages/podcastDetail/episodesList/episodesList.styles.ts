import styled from 'styled-components';

export const Container = styled.section `
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export const NumberOfEpisodes = styled.p `
    font-weight: 600;
    font-size: 1.6em;
    padding: 1rem;
    box-shadow: -2px 8px 10px 3px rgba(200, 200, 200, 0.721);
`

export const TableWrapper = styled.div `
   padding: 1rem;
   margin-bottom: 4rem;
   box-shadow: -2px 8px 10px 3px rgba(200, 200, 200, 0.721); */
`

export const Table = styled.table `
    border-collapse: collapse;
    
    & td {
    padding: 0.8rem;
    border-bottom: 2px solid lightgrey;
   }
`

export const TableRow = styled.tr <{ $even?: boolean }>`
    background-color: ${props => props.$even ? '#f5f5f5' :'white'};
`

export const EpisodeName = styled.td `
    color: #1259a9;
    min-width: 10rem;
`

export const EpisodeDuration = styled.td `
    text-align: center;
`

export const EpisodeDate = styled.td `
    text-align: center;
`

export const TableTitle = styled.tr `
   text-align: left;
   
   & >th {
    padding: 1rem 0.5rem;
    border-bottom: 3px solid lightgrey;
   }
`