'use client'

import { signOut } from 'next-auth/react'
import { FaSignOutAlt } from 'react-icons/fa'

export function SignOutBtn() {
	return (
		<button
			className='border flex w-full px-4 py-2 items-center gap-2 text-lg rounded-lg mt-6 hover:bg-gray-50'
			onClick={() => signOut()}
		>
			<FaSignOutAlt /> Sign Out
		</button>
	)
}
