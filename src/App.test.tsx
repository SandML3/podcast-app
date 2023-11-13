import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
;

test('renders App component', async () => {
    render(<App />);

    await waitFor(async () => {
        const app = screen.getByTestId('app');
        expect(app).toBeInTheDocument();
    })
}) 

