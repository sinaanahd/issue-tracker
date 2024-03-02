import Link from 'next/link'
import React from 'react'
import { FaBug } from "react-icons/fa";



const Navbar = () => {

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
                <li>
                    <Link
                        key={l.id}
                        className='text-zinc-500 hover:text-zinc-800 transition-colors'
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
