interface ITransactionItem {
	date: string
	category: string

	amount: number
	wallet: string
}

export function TransactionItem({
	date,
	category,

	wallet,
	amount,
}: ITransactionItem) {
	return (
		<>
			<p className='border-r-2 text-center py-2 overflow-x-scroll'>{date}</p>
			<p className='border-r-2 text-center py-2 overflow-x-scroll'>
				{category}
			</p>
			<p className='border-r-2 text-center py-2 overflow-x-scroll'>{wallet}</p>
			<p
				className={`text-center py-2 overflow-x-scroll ${
					amount > 0 ? 'text-green-500' : 'text-red-500'
				}`}
			>
				{amount > 0 ? `$${amount}` : `-$${amount}`}
			</p>
		</>
	)
}
