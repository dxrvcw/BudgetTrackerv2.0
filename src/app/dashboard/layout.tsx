'use client'

import { SidebarNav } from '@/components/SidebarNav'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<div className='flex container justify-between gap-8 m-auto h-screen '>
			{/* Sidebar for larger screens */}
			<aside className='shadow-lg w-full rounded-2xl px-4 py-6  basis-1/4 h-full hidden md:block'>
				<h1 className='text-2xl text-center'>Budget dashboard</h1>
				<SidebarNav />
			</aside>

			{/* Sidebar for mobile screens */}
			{isSidebarOpen && (
				<aside className='fixed inset-0 bg-white shadow-lg w-3/4 rounded-2xl px-4 py-6 z-50 md:hidden'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl'>Budget dashboard</h1>
						<button onClick={toggleSidebar}>
							<IoMdClose className='text-2xl' />
						</button>
					</div>
					<SidebarNav />
				</aside>
			)}

			{/* Burger menu button for mobile screens */}
			<button
				className='md:hidden fixed top-4 right-4 z-50 p-2 bg-gray-800 text-white rounded-full shadow-lg'
				onClick={toggleSidebar}
			>
				<FaBars className='text-2xl' />
			</button>

			<main className='md:basis-3/4 w-full md:block p-4 md:p-0'>
				{children}
			</main>
		</div>
	)
}
