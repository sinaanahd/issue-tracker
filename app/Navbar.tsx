'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { FaBug } from "react-icons/fa";
import classNames from 'classnames';


const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    {
        id : 1,
        label : "Dashboard",
        href : "/"
    },
    {
        id : 2,
        label : "Issues",
        href : "/issues"
    }
  ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/">
            <FaBug />
        </Link>
        <ul className='flex space-x-6'>
            {
                links.map(l => 
                <li key={l.id}>
                    <Link 
                        // className={`text-zinc-${currentPath === l.href ? 900 : 500} hover:text-zinc-800 transition-colors`}
                        className={classNames({
                            "text-zinc-900" : l.href === currentPath,
                            "text-zinc-500" : l.href !== currentPath,
                            "font-bold" : l.href === currentPath,
                            "hover:text-zinc-800" : true,
                            "transition-colors" : true
                        })}
                        href={l.href}
                        >
                        {l.label}
                    </Link>
                </li>
                )
            }
        </ul>
    </nav>
  )
}

export default Navbar
