import { DeleteForm } from '../wallets/DeleteForm'
import { EditWalletForm } from '../wallets/EditWalletForm'

interface IWalletProps {
	name: string
	balance: number
	wallet_id: string
	controls: boolean
}

export function Wallet({ name, balance, wallet_id, controls }: IWalletProps) {
	return (
		<div className='w-full rounded-md shadow-md px-4 py-2 flex justify-between items-center'>
			<div>
				<h2 className='text-lg'>{name}</h2>
				<p className='text-sm'>Balance: ${balance}</p>
			</div>
			{controls && (
				<div className='flex gap-2'>
					<EditWalletForm name={name} balance={balance} wallet_id={wallet_id} />
					<DeleteForm id={wallet_id} type='Wallet' />
				</div>
			)}
		</div>
	)
}
