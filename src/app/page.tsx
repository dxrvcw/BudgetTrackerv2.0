import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import Button from '@mui/material/Button'
import { Metadata } from 'next'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export const metadata: Metadata = {
	title: 'Budget tracker v2.0',
}

export default function Home() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<main className='flex-grow container m-auto flex justify-center items-center'>
				<div className='flex flex-col items-center gap-10 relative'>
					<div className='bg-purple-900 absolute -top-28 -left-28 w-60 h-60 rounded-full blur-[200px]'></div>
					<div className='bg-pink-900 absolute -bottom-28 -right-28 w-60 h-60 rounded-full blur-[200px]'></div>
					<h1 className='text-5xl font-bold antialiased drop-shadow-md text-gray-800'>
						Budget Tracker Web Application
					</h1>
					<p className='text-lg max-w-[500px] text-center text-gray-500'>
						Track your expenses and stay on top of your finances with our Budget
						Tracker web app!
					</p>
					<Link href='/dashboard'>
						<Button variant='contained' size='large' endIcon={<FaArrowRight />}>
							Start using now!
						</Button>
					</Link>
				</div>
			</main>
			<Footer />
		</div>
	)
}
