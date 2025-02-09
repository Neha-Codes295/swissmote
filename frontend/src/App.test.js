import { render, screen } from '@testing-library/react';
import App from './App';

/**
 * Test suite for the App component
 * This test verifies that the main App component renders correctly
 * and contains the expected 'learn react' link
 */
describe('App Component', () => {
  // Test case to verify the presence of the 'learn react' link
  test('should render learn react link', () => {
    // Render the App component
    render(<App />);

    // Query for the link element using case-insensitive regex
    const linkElement = screen.getByText(/learn react/i);

    // Assert that the link is present in the document
    expect(linkElement).toBeInTheDocument();
  });
});
