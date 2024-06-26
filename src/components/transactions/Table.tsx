import type { ICategory, ITransaction, IWallet } from '@/utils/definitions'

export function Table({
	transactions,
	wallets,
	categories,
}: {
	transactions: ITransaction[]
	wallets: IWallet[]
	categories: ICategory[]
}) {
	return (
		<div className='basis-2/3 h-full shadow-lg flex flex-col items-center py-4 max-h-screen overflow-y-scroll'>
			<p className='text-xl'>Your Transactions</p>
			{transactions.map(transaction => (
				<div
					key={transaction.id}
					className='grid grid-cols-6 w-full items-center justify-items-center place-content-center py-2 text-center mt-4 '
				>
					<p>{transaction.date.toISOString().split('T')[0]}</p>
					<p>
						{wallets.find(wallet => wallet.id === transaction.walletId)?.name}
					</p>
					<p>
						{
							categories.find(
								category => category.id === transaction.categoryId
							)?.name
						}
					</p>
					<p>{transaction.description}</p>
					<p>
						{transaction.amount > 0
							? transaction.amount
							: '-' + transaction.amount}
					</p>
					<div className='flex gap-2'>
						<button>Edit</button>
						<button>Delete</button>
					</div>
				</div>
			))}
		</div>
	)
}
