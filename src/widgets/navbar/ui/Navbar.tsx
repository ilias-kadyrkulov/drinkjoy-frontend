'use client';

import {
  RiFileListLine,
  RiPieChart2Line,
  RiQrCodeLine,
  RiQuestionAnswerLine,
  RiShoppingCartLine,
  RiTeamLine,
  RiUserSmileLine,
} from '@remixicon/react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/shared/ui';

export const Navbar = () => {
  const pathname = usePathname();
  const user = JSON.parse(localStorage.getItem('current_user') ?? '');

  const Links =
    user?.role === 'partner'
      ? [
          {
            label: 'Dashboard',
            icon: <RiPieChart2Line size={30} />,
            path: '/partner/dashboard',
          },
          {
            label: 'Menu',
            icon: <RiFileListLine size={30} />,
            path: '/partner/menu',
          },
          {
            label: 'Customers',
            icon: <RiUserSmileLine size={30} />,
            path: '/partner/customer',
          },
          {
            label: 'Orders',
            icon: <RiShoppingCartLine size={30} />,
            path: '/partner/orders',
          },
          {
            label: 'QR',
            icon: <RiQrCodeLine size={30} />,
            path: '',
          },
        ]
      : [
          {
            label: 'Users',
            icon: <RiUserSmileLine size={30} />,
            path: '/admin/users',
          },
          {
            label: 'Partners',
            icon: <RiTeamLine size={30} />,
            path: '/admin/partners',
          },
          {
            label: 'Menu',
            icon: <RiFileListLine size={30} />,
            path: '/admin/menu',
          },
          {
            label: 'Support',
            icon: <RiQuestionAnswerLine size={30} />,
            path: '/admin/support',
          },
        ];

  return (
    <nav className="mt-8 w-full flex-1 overflow-auto overflow-x-hidden p-4 sm:mt-0 sm:block sm:border-t sm:border-theme-grey-300 sm:border-opacity-20">
      <ul className="space-y-3">
        {Links.map((link, index) => {
          return (
            /* FIX_ME: Use reusable Link component */
            <li key={index}>
              <Link href={link.path}>
                <Button
                  variant="link"
                  width="full"
                  className={clsx(
                    'flex flex-col text-theme-grey-400 sm:flex-row sm:justify-start sm:p-3',
                    {
                      ['bg-theme-blue-400 text-theme-white']:
                        link.path.length && pathname.includes(link.path),
                    },
                  )}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
