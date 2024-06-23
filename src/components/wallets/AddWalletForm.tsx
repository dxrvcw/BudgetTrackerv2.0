import { addWallet } from '@/data/userActions'
import { revalidatePath } from 'next/cache'

export function AddWalletForm({ user_id }: { user_id: string }) {
	const handleAddWallet = async (formData: FormData) => {
		'use server'
		const user_id = formData.get('userId')!.toString()
		const wallet_name = formData.get('walletName')!.toString()
		const wallet_balance = formData.get('walletBalance')!
		if (!wallet_name || !wallet_balance) return
		const wallet = await addWallet(user_id, wallet_name, +wallet_balance)
		if (wallet) {
			revalidatePath('/dashboard/wallets')
			return
		}
	}

	return (
		<div className='w-full h-fit rounded-lg shadow-lg py-3 px-4 flex flex-col '>
			<p className='text-lg flex gap-2 items-center justify-center'>
				Add new wallet
			</p>

			<form className='flex flex-col gap-2' action={handleAddWallet}>
				<label className='text-sm' htmlFor='walletName'>
					Wallet name
				</label>
				<input
					className='w-full h-10 pl-2 pr-2 text-sm rounded-lg border'
					id='walletName'
					type='text'
					name='walletName'
					placeholder='Enter wallet name'
					required
				/>
				<label className='text-sm' htmlFor='walletBalance'>
					Wallet balance
				</label>
				<input
					className='w-full h-10 pl-2 pr-2 text-sm rounded-lg border'
					id='walletBalance'
					type='number'
					name='walletBalance'
					placeholder='Enter wallet balance'
					required
				/>
				<input type='hidden' name='userId' defaultValue={user_id} />
				<button
					type='submit'
					className='mt-2 bg-green-500 hover:bg-green-600 text-white py-1 rounded-md'
				>
					Add wallet
				</button>
			</form>
		</div>
	)
}
