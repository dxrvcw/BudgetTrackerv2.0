'use client'

import Button from '@mui/material/Button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FaSignInAlt } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'

export function HeaderProfile() {
	const session = useSession()

	return session.status === 'authenticated' ? (
		<div className='flex items-center gap-2'>
			<Button variant='outlined' size='small' onClick={() => signOut()}>
				Sign out
			</Button>
			<Link href='/dashboard'>
				<Button
					variant='contained'
					className='text-sm'
					size='small'
					endIcon={<MdSpaceDashboard />}
				>
					Dashboard
				</Button>
			</Link>
		</div>
	) : (
		<div className='flex items-center gap-2'>
			<Link href='/sign-in'>
				<Button variant='outlined' size='small'>
					Sign-in
				</Button>
			</Link>
			<Link href='/register'>
				<Button
					variant='contained'
					className='text-sm'
					size='small'
					endIcon={<FaSignInAlt />}
				>
					Register
				</Button>
			</Link>
		</div>
	)
}
