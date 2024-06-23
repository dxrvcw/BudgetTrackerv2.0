'use client'

import { deleteCategory, deleteWallet } from '@/data/userActions'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Collapse from '@mui/material/Collapse'
import { useState } from 'react'

interface IDeleteForm {
	type: 'Category' | 'Wallet'
	id: string
}

export function DeleteForm({ type, id }: IDeleteForm) {
	const [alert, setAlert] = useState<boolean>()

	const handleDelete = async () => {
		let res = { status: 'pending' }
		if (type === 'Category') {
			res = await deleteCategory(id)
		}

		if (type === 'Wallet') {
			res = await deleteWallet(id)
		}
		if (res.status === 'error') {
			setAlert(true)
			setTimeout(() => setAlert(false), 3500)
		}
	}

	return (
		<div className='bg-red-300 px-2 py-1 rounded-md ml-2'>
			<Collapse in={alert}>
				<Alert severity='error' className='fixed bottom-2 right-2 '>
					<AlertTitle>Failed to delete</AlertTitle>
					{type} has been used in transactions! Try to edit it instead!
				</Alert>
			</Collapse>

			<form action={handleDelete}>
				<button type='submit'>Delete</button>
			</form>
		</div>
	)
}
