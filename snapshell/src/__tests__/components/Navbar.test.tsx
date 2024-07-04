import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import userEvent from '@testing-library/user-event';

// Mocking the Kinde auth server session
jest.mock('@kinde-oss/kinde-auth-nextjs/server', () => ({
  getKindeServerSession: () => ({
    getUser: jest.fn(),
  }),
}));

const { getKindeServerSession } = require('@kinde-oss/kinde-auth-nextjs/server');

// Setting up environment variable
process.env.ADMIN_EMAIL = 'admin@example.com';

describe('Navbar', () => {
  it('renders login and signup links when user is not logged in', async () => {
    // Mock
    getKindeServerSession().getUser.mockResolvedValue(null);

    render(await Navbar());

    expect(await screen.findByText(/login/i)).toBeInTheDocument();
    expect(await screen.findByText(/sign up/i)).toBeInTheDocument();
    expect(await screen.findByText(/create case/i)).toBeInTheDocument();
    expect(screen.queryByText(/log out/i)).not.toBeInTheDocument();
  });
});
