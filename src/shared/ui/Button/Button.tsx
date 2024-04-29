import { ComponentProps, forwardRef } from 'react';
import { cva } from 'cva';
import { twMerge } from 'tailwind-merge';

import { ButtonProps } from './types/Button.types';

const buttonVariants = cva(
  [
    'flex',
    'leading-none',
    'gap-2',
    'items-center',
    'justify-center',
    'outline-none',
    'focus-visible:ring-4',
    'transition-all',
    'rounded-md',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-theme-primary-300',
          'text-theme-white',
          'hover:bg-theme-primary-200',
          'active:bg-theme-primary-400',
          'focus-visible:bg-theme-primary-300',
          'disabled:bg-theme-grey-100',
          'disabled:text-theme-grey-400',
          'focus-visible:ring-theme-primary-100',
        ],
        outline: [
          'bg-theme-white',
          'text-theme-black',
          'hover:bg-theme-grey-200',
          'border-2',
          'border-theme-grey-200',
          'active:bg-theme-grey-300',
          'focus-visible:bg-theme-white',
          'disabled:bg-theme-grey-100',
          'disabled:text-theme-grey-400',
          'focus-visible:ring-theme-blue-400',
        ],
        ghost: [
          'bg-transparent',
          'text-theme-black',
          'hover:bg-theme-grey-200',
          'active:bg-theme-grey-300',
          'focus-visible:bg-theme-white',
          'disabled:bg-theme-grey-100',
          'disabled:text-theme-grey-400',
          'focus-visible:ring-theme-blue-400',
        ],
        delete: [
          'bg-theme-red-200',
          'text-theme-red-500',
          'hover:bg-theme-red-100',
          'active:bg-theme-red-300',
          'focus-visible:bg-theme-red-200',
          'disabled:bg-theme-grey-100',
          'disabled:text-theme-grey-400',
          'focus-visible:ring-theme-red-400',
        ],
        link: [
          'bg-transparent',
          'text-theme-grey-100',
          'hover:bg-theme-blue-400',
          'active:bg-theme-blue-400',
          'focus-visible:bg-theme-blue-400',
          'disabled:bg-theme-grey-100',
          'disabled:text-theme-grey-400',
          'focus-visible:ring-0',
        ],
        none: [''],
      },
      size: {
        sm: ['text-sm', 'py-1.5', 'px-3'],
        md: ['text-base', 'py-2.5', 'px-6'],
      },
      btnType: {
        button: '',
        icon: ['p-0'],
      },
      width: {
        auto: 'w-auto',
        full: 'w-full',
      },
    },
    compoundVariants: [
      { variant: 'link', class: 'px-4 py-6' },

      { btnType: 'icon', size: 'sm', class: 'h-8 w-8' },
      { btnType: 'icon', size: 'md', class: 'h-11 w-11' },

      { btnType: 'icon', size: 'sm', width: 'full', class: 'h-6 w-full' },
      { btnType: 'icon', size: 'md', width: 'full', class: 'h-11 w-full' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      btnType: 'button',
      width: 'auto',
    },
  },
);

const Button = forwardRef<ComponentProps<'button'>, ButtonProps>(props => {
  const { children, variant, size, btnType, width, className, ref, ...rest } =
    props;

  const classNameGenerated = twMerge(
    buttonVariants({
      variant,
      size,
      btnType,
      width,
    }),
    className,
  );

  return (
    <button
      ref={ref}
      {...rest}
      aria-label="button"
      className={classNameGenerated}
    >
      {children}
    </button>
  );
});

export { Button, buttonVariants };
