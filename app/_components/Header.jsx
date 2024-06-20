import React from 'react';
import { menuItems } from '../_constants/menu.js';
import { Button } from '@/components/ui/button.jsx';
import Link from 'next/link.js';
import Image from 'next/image';

function Header() {
  return (
    <div className="sticky top-0 z-10 bg-white flex justify-between items-center p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Logo" width={180} height={80} />
        <ul className="md:flex gap-6 hidden">
          {menuItems.map((item) => (
            <Link href={item.path} key={item.id}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <Image
          src="/account.svg"
          alt="Menu"
          width={30}
          height={30}
          className="cursor-pointer"
        />
        <Image
          src="/menu.svg"
          alt="Menu"
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Header;
