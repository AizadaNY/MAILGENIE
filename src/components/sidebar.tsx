'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineClose, AiOutlineAppstore, AiOutlineLogout, AiOutlineMenu, AiOutlineSetting, 
    AiOutlineMessage, AiOutlineCluster , AiOutlineCalendar , AiOutlineMail  } from 'react-icons/ai';

const navElements = [
    { title: 'Dashboard', href: '/dashboard', icon: AiOutlineAppstore },
    { title: 'Conversations', href: '/conversations', icon: AiOutlineMessage },
    { title: 'Integrations', href: '/integrations', icon: AiOutlineCluster },
    { title: 'Appointments', href: '/appointments', icon: AiOutlineCalendar },
    { title: 'Email Marketing', href: '/emailmarketing', icon: AiOutlineMail },
    { title: 'Settings', href: '/settings', icon: AiOutlineSetting },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`h-screen bg-gray-100 text-gray-900 flex flex-col ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between h-20 bg-gray-100 border-b border-gray-100 p-4">
                <h1 className={`text-3xl font-bold text-gray-600 transition-all ${isCollapsed ? 'hidden' : 'block'}`}>
                    <Link href="/">MailGenie</Link>
                </h1>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className='text-gray-900 focus:outline-none'
                >
                    {isCollapsed ? <AiOutlineMenu size={24} /> : <AiOutlineClose size={24} />}
                </button>
            </div>

            {/* Navigation Links */}
            <nav className='mt-10 flex-1'>
                {navElements.map(({ title, href, icon: Icon }) => (
                    <Link href={href} key={title}>
                        <div className={`relative flex items-center py-2.5 px-4 rounded transition duration-300 hover:bg-gray-300 hover:text-blue-400 ${isCollapsed ? 'justify-center' : ''}`}>
                            <Icon className='w-6 h-6' />
                            {!isCollapsed && (
                                <span className="ml-2 transition-opacity duration-300 delay-300">
                                    {title}
                                </span>
                            )}
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Logout Button */}
            <div className='mb-10'>
                <button className={`flex items-center py-2.5 px-4 w-full text-left rounded transition duration-300 hover:bg-red-500 hover:text-white ${isCollapsed ? 'justify-center' : ''}`}>
                    <AiOutlineLogout className='w-6 h-6' />
                    {!isCollapsed && (
                        <span className="ml-2 transition-opacity duration-300 delay-200">
                            Log Out
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
