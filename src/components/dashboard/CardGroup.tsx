import { Card } from '@/components/dashboard/Card'
import { getTransactions, getWallets } from '@/data/data'
import { getStartOfMonth } from '@/utils/utils'
import { FaMoneyBillWave } from 'react-icons/fa'
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi'
import { GrTransaction } from 'react-icons/gr'

export async function CardGroup({
	className,
	user_id,
}: {
	className?: string
	user_id: string
}) {
	const wallets = await getWallets(user_id)
	const availableMoney = wallets?.reduce(
		(acc, wallet) => acc + wallet.balance,
		0
	)

	const transactions = await getTransactions(
		user_id,
		getStartOfMonth().toISOString()
	)
	const totalIncome = transactions?.reduce((acc, tran) => {
		if (tran.amount > 0) return acc + tran.amount
		return 0
	}, 0)
	const totalExpense = transactions?.reduce((acc, tran) => {
		if (tran.amount < 0) return acc + tran.amount
		return 0
	}, 0)

	return (
		<div
			className={`flex w-full justify-center lg:justify-between flex-wrap flex-col md:flex-row items-center gap-3 ${className}`}
		>
			<Card
				icon={<FaMoneyBillWave />}
				label='Available money'
				type='money'
				value={availableMoney || 0}
				iconColor='bg-blue-500'
			/>
			<Card
				icon={<GiReceiveMoney />}
				label='Month income'
				type='money'
				value={totalIncome || 0}
				iconColor='bg-green-500'
			/>
			<Card
				icon={<GiPayMoney />}
				label='Month expenses'
				type='money'
				value={totalExpense || 0}
				iconColor='bg-red-500'
			/>
			<Card
				icon={<GrTransaction />}
				label='Month transactions'
				type='raw'
				value={transactions?.length || 0}
				iconColor='bg-slate-500'
			/>
		</div>
	)
}
