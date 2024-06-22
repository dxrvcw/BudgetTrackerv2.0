'use client'

import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEventHandler, useState } from 'react'

export function SignInForm() {
	const searchParams = useSearchParams()

	const [error, setError] = useState<boolean>(false)

	const router = useRouter()

	const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)

		const res = await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirect: false,
		})

		if (res) {
			if (res.ok) {
				console.log(searchParams.get('callbackUrl'))
				router.push(searchParams.get('callbackUrl') || '/')
			} else {
				setError(true)
			}
		}
	}

	return (
		<form
			className='w-80 flex flex-col items-center gap-5 px-6 py-10 shadow-lg rounded-xl'
			onSubmit={handleSubmit}
		>
			<h2 className='text-2xl'>Sign In</h2>
			<TextField
				id='outlined-basic'
				label='Enter email'
				variant='outlined'
				size='small'
				name='email'
				type='email'
				className='mt-6'
				fullWidth
				error={error}
			/>
			<TextField
				id='outlined-basic'
				label='Enter password'
				variant='outlined'
				size='small'
				name='password'
				type='password'
				fullWidth
				error={error}
			/>
			<Button type='submit' variant='contained'>
				Sign In
			</Button>
			<label className='block text-sm mt-6'>
				Don`t have an account?
				<Link href='/register' className='text-blue-600 ml-2'>
					Register
				</Link>
			</label>
		</form>
	)
}
