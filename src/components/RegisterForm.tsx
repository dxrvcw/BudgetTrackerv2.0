'use client'

import { registerUser } from '@/data/userActions'
import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

interface FormData {
	email: string
	password: string
	confirmPassword: string
}

interface FormErrors {
	email: string
	password: string
	confirmPassword: string
}

export function RegisterForm() {
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [errors, setErrors] = useState<FormErrors>({
		email: '',
		password: '',
		confirmPassword: '',
	})

	const router = useRouter()

	const searchParams = useSearchParams()

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
		setErrors(prev => ({ ...prev, [name]: '' }))
	}

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {
			email: '',
			password: '',
			confirmPassword: '',
		}

		if (!formData.email) {
			newErrors.email = 'Email is required'
		}

		if (!formData.password) {
			newErrors.password = 'Password is required'
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters'
		}

		if (formData.confirmPassword !== formData.password) {
			newErrors.confirmPassword = 'Passwords do not match'
		}

		setErrors(newErrors)
		return Object.values(newErrors).every(error => error === '')
	}

	const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!validateForm()) {
			return
		}

		const user = await registerUser(formData.email, formData.password)

		if (user) {
			await signIn('credentials', {
				redirect: false,
				email: user.email,
				password: formData.password,
			})
			router.push(searchParams.get('callbackUrl') || '/')
		} else {
			setErrors({ ...errors, email: 'Email already exists' })
		}
	}

	return (
		<form
			className='w-80 flex flex-col items-center gap-5 px-6 py-10 shadow-lg rounded-xl'
			onSubmit={handleRegister}
		>
			<h2 className='text-2xl'>Register</h2>
			<TextField
				id='outlined-basic-email'
				label='Enter email'
				variant='outlined'
				size='small'
				name='email'
				type='email'
				className='mt-6'
				fullWidth
				value={formData.email}
				onChange={handleChange}
				error={!!errors.email}
				helperText={errors.email}
			/>
			<TextField
				id='outlined-basic-password'
				label='Enter password'
				variant='outlined'
				size='small'
				name='password'
				type='password'
				fullWidth
				value={formData.password}
				onChange={handleChange}
				error={!!errors.password}
				helperText={errors.password}
			/>
			<TextField
				id='outlined-basic-confirm-password'
				label='Confirm password'
				variant='outlined'
				size='small'
				name='confirmPassword'
				type='password'
				fullWidth
				value={formData.confirmPassword}
				onChange={handleChange}
				error={!!errors.confirmPassword}
				helperText={errors.confirmPassword}
			/>
			<Button type='submit' variant='contained'>
				Register
			</Button>
			<label className='block text-sm mt-6'>
				Already have an account?
				<Link href='/sign-in' className='text-blue-600 ml-2'>
					Sign in
				</Link>
			</label>
		</form>
	)
}
