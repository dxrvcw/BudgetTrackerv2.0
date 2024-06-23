'use client'

import { updateWallet } from '@/data/userActions'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'

interface IEditWallet {
	wallet_id: string
	name: string
	balance: number
}

export function EditWalletForm({ wallet_id, name, balance }: IEditWallet) {
	const [isOpen, setIsOpen] = useState(false)

	const handleEdit = async (formData: FormData) => {
		const name = formData.get('walletName')?.toString()
		const balance = Number(formData.get('walletBalance')) || 0
		if (!name) return
		await updateWallet(wallet_id, name, balance)
		setIsOpen(false)
	}

	return (
		<div>
			{isOpen && (
				<div className='absolute top-0 left-0 w-screen h-screen bg-black/20 flex justify-center items-center'>
					<form
						action={handleEdit}
						className='w-1/2 h-fit bg-white relative py-6 px-8 rounded-md'
					>
						<button
							onClick={() => setIsOpen(false)}
							className='absolute top-2 right-2 text-xl'
						>
							<MdClose />
						</button>

						<label className='text-sm' htmlFor='walletName'>
							Wallet name
						</label>
						<input
							className='w-full h-10 pl-2 pr-2 text-sm rounded-lg border mb-4'
							id='walletName'
							type='text'
							name='walletName'
							placeholder='Enter wallet name'
							defaultValue={name}
						/>
						<label className='text-sm' htmlFor='walletBalance'>
							Wallet balance
						</label>
						<input
							className='w-full h-10 pl-2 pr-2 text-sm rounded-lg border'
							id='walletBalance'
							type='number'
							name='walletBalance'
							defaultValue={balance}
							placeholder='Enter wallet balance'
						/>

						<button
							type='submit'
							className=' bg-yellow-200 hover:bg-yellow-300 py-1 rounded-md w-full mt-6'
						>
							Edit wallet
						</button>
					</form>
				</div>
			)}
			<button
				className='bg-yellow-300 px-2 py-1 rounded-md'
				onClick={() => setIsOpen(true)}
			>
				Edit
			</button>
		</div>
	)
}
