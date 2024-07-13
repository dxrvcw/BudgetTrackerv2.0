'use client'

import { deleteTransaction } from '@/data/userActions'
import { useState } from 'react'
import { EditTransactionForm } from './EditTransactionForm'

export function TransactionControls({ id }: { id: string }) {
	const [isOpen, setIsOpen] = useState(false)

	const handleDelete = async () => {
		const response = await deleteTransaction(id)
		if (response.status !== 'Success!') {
			alert(response.status)
		}
	}
	return (
		<>
			{isOpen && <EditTransactionForm id={id} setIsOpen={setIsOpen} />}
			<button
				className='px-2 py-1 bg-yellow-400 hover:bg-yellow-500 rounded-md'
				onClick={() => setIsOpen(true)}
			>
				Edit
			</button>
			<button
				onClick={handleDelete}
				className='px-2 py-1 bg-red-400 hover:bg-red-500 rounded-md'
			>
				Delete
			</button>
		</>
	)
}
