
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'w-full text-white py-4 px-6 border-4 border-black rounded-lg transition-all duration-150 ease-in-out text-sm sm:text-base';
  const variantClasses = {
    primary: 'bg-pink-400 hover:bg-pink-500 active:translate-y-1 active:translate-x-1 active:shadow-none pixel-shadow-sm',
    secondary: 'bg-purple-500 hover:bg-purple-600 active:translate-y-1 active:translate-x-1 active:shadow-none pixel-shadow-sm',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
