import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { podcastDetailMock } from '../../../application/mocks/podcastDetailMock';
import PodcastInfo from './PodcastInfo';

describe('Podcast info component test', () => {

    it('should render podcast info component', async () => {

        render(
            <MemoryRouter>
                <PodcastInfo podcast={podcastDetailMock}/>
            </MemoryRouter>
        );

        const podcastTitle =  await screen.findByText(podcastDetailMock.title);
        expect(podcastTitle).toBeInTheDocument();

        const podcastAuthor =  await screen.findByText(`by ${podcastDetailMock.author}`);
        expect(podcastAuthor).toBeInTheDocument();
    });
})