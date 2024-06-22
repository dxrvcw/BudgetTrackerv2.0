import { getCategories, getTransactions, getWallets } from '@/data/data'
import { getStartOfMonth } from '@/utils/utils'
import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'
import { MdDateRange } from 'react-icons/md'
import { TransactionItem } from './TransactionItem'

export async function TransactionTable({
	className,
	user_id,
}: {
	className?: string
	user_id: string
}) {
	const transactions = await getTransactions(
		user_id,
		getStartOfMonth().toISOString()
	)
	const wallets = await getWallets(user_id)
	const categories = await getCategories(user_id)

	return (
		<div
			className={`w-full h-full rounded-lg shadow-lg flex flex-col py-3 px-4 ${className}`}
		>
			<p className='ml-6 text-lg flex gap-2 items-center justify-center'>
				Month transactions <MdDateRange size={20} />
			</p>

			<div className='flex flex-col mt-6 flex-grow'>
				<div className='grid grid-cols-4 overflow-y-scroll'>
					<p className='border-r-2 text-center py-1 border-b-2'>Date</p>
					<p className='border-r-2 text-center py-1 border-b-2'>Category</p>
					<p className='border-r-2 text-center py-1 border-b-2'>Wallet</p>
					<p className='text-center py-1 border-b-2'>Amount</p>

					{transactions?.map(transaction => (
						<TransactionItem
							key={transaction.id}
							amount={transaction.amount}
							category={
								categories?.find(
									category => category.id === transaction.categoryId
								)?.name || 'No such category'
							}
							date={transaction.date.toLocaleDateString('ru-RU', {
								year: 'numeric',
								month: '2-digit',
								day: '2-digit',
							})}
							wallet={
								wallets?.find(wallet => wallet.id === transaction.walletId)
									?.name || 'No such wallet'
							}
						/>
					))}
				</div>
			</div>
			<div className='flex justify-end'>
				<Link
					href='/dashboard/transactions'
					className='text-lg flex gap-2 items-center hover:underline'
				>
					See all transactions
					<FaArrowRightLong size={16} />
				</Link>
			</div>
		</div>
	)
}
