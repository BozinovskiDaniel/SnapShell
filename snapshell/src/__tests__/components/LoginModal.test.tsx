import LoginModal from '@/components/LoginModal';
import { render, screen } from '@testing-library/react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => 'Image', // Mock Image as a simple element or more detailed mock depending on needs
}));

import { ReactNode } from 'react';

jest.mock('@kinde-oss/kinde-auth-nextjs', () => ({
  LoginLink: ({ children }: { children: ReactNode }) => <button>{children}</button>, // Simple mock for LoginLink
  RegisterLink: ({ children }: { children: ReactNode }) => <button>{children}</button>, // Simple mock for RegisterLink
}));

describe('LoginModal', () => {
  it('should show login modal correctly', () => {
    render(<LoginModal isOpen={true} setIsOpen={jest.fn()} />);

    expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
  });
});
