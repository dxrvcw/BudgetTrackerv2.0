'use client'

import { addTransaction } from '@/data/userActions'
import { ICategory, IWallet } from '@/utils/definitions'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'

export function AddTransactionForm({
	wallets,
	categories,
	userId,
}: {
	wallets: IWallet[]
	categories: ICategory[]
	userId: string
}) {
	const [isOpen, setIsOpen] = useState(false)

	const handleAdd = async (formData: FormData) => {
		const user_id = formData.get('userId')
		const category_id = formData.get('category')
		const wallet_id = formData.get('wallet')
		const desc = formData.get('desc')
		const amount = formData.get('amount')
		const date = formData.get('date')

		if (!user_id || !category_id || !wallet_id || !amount || !date) return

		await addTransaction(
			user_id.toString(),
			category_id.toString(),
			wallet_id.toString(),
			new Date(date.toString()).toISOString(),
			+amount,
			desc ? desc.toString() : ''
		)
		setIsOpen(false)
	}

	return (
		<div>
			<button
				className='w-full bg-green-500 hover:bg-green-600 mt-4 rounded-lg text-white py-2'
				onClick={() => setIsOpen(open => !open)}
			>
				New Transaction
			</button>
			{isOpen && (
				<div className='fixed top-0 left-0 bg-black/20 w-screen h-screen flex justify-center items-center'>
					<form
						className='w-1/2 h-fit bg-white relative py-6 px-8 rounded-md'
						action={handleAdd}
					>
						<button
							onClick={() => setIsOpen(false)}
							className='absolute top-2 right-2 text-xl'
						>
							<MdClose />
						</button>

						<label className='text-sm' htmlFor='category'>
							Select category
						</label>
						<select className='ml-6 mb-4' name='category'>
							{categories.map(category => (
								<option value={category.id} key={category.id}>
									{category.name}
								</option>
							))}
						</select>
						<label className='text-sm ml-8' htmlFor='category'>
							Select wallet
						</label>
						<select className='ml-6' name='wallet'>
							{wallets.map(wallet => (
								<option value={wallet.id} key={wallet.id}>
									{wallet.name}
								</option>
							))}
						</select>

						<input
							className='w-full h-10 pl-2 pr-2 text-sm rounded-lg border'
							id='desc'
							type='text'
							name='desc'
							placeholder='Enter description'
						/>

						<input
							className='w-full h-10 pl-2 pr-2 mt-4 text-sm rounded-lg border'
							id='amount'
							type='number'
							name='amount'
							placeholder='Enter amount'
						/>

						<input
							className='w-full h-10 pl-2 pr-2 mt-4 text-sm rounded-lg border'
							id='date'
							type='date'
							name='date'
							placeholder='Enter date'
						/>

						<input type='hidden' name='userId' defaultValue={userId} />

						<button
							type='submit'
							className=' bg-green-500 hover:bg-green-600 py-1 rounded-md text-white w-full mt-6'
						>
							Add transaction
						</button>
					</form>
				</div>
			)}
		</div>
	)
}
