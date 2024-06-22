interface IWalletProps {
	name: string
	balance: number
}

export function Wallet({ name, balance }: IWalletProps) {
	return (
		<div className='w-full rounded-md shadow-md px-4 py-2'>
			<h2 className='text-lg'>{name}</h2>
			<p className='text-sm'>Balance: ${balance}</p>
		</div>
	)
}
