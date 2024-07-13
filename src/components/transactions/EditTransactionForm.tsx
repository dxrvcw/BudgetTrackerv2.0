'use client'

import { getCategories, getWallets } from '@/data/data'
import { editTransaction } from '@/data/userActions'
import { ICategory, IWallet } from '@/utils/definitions'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'

export function EditTransactionForm({
	id,
	setIsOpen,
}: {
	id: string
	setIsOpen: (arg: boolean) => void
}) {
	const [categories, setCategories] = useState<ICategory[]>()
	const [wallets, setWallets] = useState<IWallet[]>()
	const [userId, setUserId] = useState('')

	useEffect(() => {
		const fetch = async () => {
			const session = await getSession()
			const id = session?.user?.name || ''
			const wallets = (await getWallets(id)) || []
			const categories = (await getCategories(id)) || []
			setWallets(wallets)
			setCategories(categories)
			setUserId(id)
		}
		fetch()
	}, [])

	const handleEdit = async (formData: FormData) => {
		const category = formData.get('category')?.toString() || ''
		const wallet = formData.get('wallet')?.toString() || ''
		const amount = formData.get('amount')?.toString() || ''
		const description = formData.get('description')?.toString() || ''
		const date = new Date(
			formData.get('date')?.toString() || Date.now()
		).toISOString()
		await editTransaction(id, description, amount, date, wallet, category)
		setIsOpen(false)
	}

	return (
		<div className='fixed top-0 left-0 bg-black/20 w-screen h-screen flex justify-center items-center'>
			<form
				className='w-1/2 h-fit bg-white relative py-6 px-8 rounded-md'
				action={handleEdit}
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
					{categories?.map(category => (
						<option value={category.id} key={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<label className='text-sm ml-8' htmlFor='category'>
					Select wallet
				</label>
				<select className='ml-6' name='wallet'>
					{wallets?.map(wallet => (
						<option value={wallet.id} key={wallet.id}>
							{wallet.name}
						</option>
					))}
				</select>

				<input type='hidden' defaultValue={userId} name='id' />

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

				<button
					type='submit'
					className=' bg-green-500 hover:bg-green-600 py-1 rounded-md text-white w-full mt-6'
				>
					Edit transaction
				</button>
			</form>
		</div>
	)
}
