import { AddTransactionForm } from '@/components/transactions/AddTransactionForm'
import { SearchBar } from '@/components/transactions/SearchBar'
import { Table } from '@/components/transactions/Table'
import { authConfig } from '@/configs/auth'
import { getCategories, getTransactions, getWallets } from '@/data/data'
import { getServerSession } from 'next-auth/next'
interface ISearchParams {
	searchParams: {
		wallets: string
		categories: string
		dateFrom: string
		dateTo: string
	}
}

export default async function TransactionsPage({
	searchParams,
}: ISearchParams) {
	const session = await getServerSession(authConfig)

	const categories = await getCategories(session?.user?.name || '')
	const wallets = await getWallets(session?.user?.name || '')

	const transactions = await getTransactions(
		session?.user?.name || '',
		searchParams.dateFrom,
		searchParams.dateTo,
		searchParams.categories?.split(',') || '',
		searchParams.wallets?.split(',') || ''
	)

	return (
		<main className='flex gap-4'>
			<Table
				transactions={transactions || []}
				wallets={wallets}
				categories={categories}
			/>
			<div className='basis-1/3 '>
				<SearchBar wallets={wallets} categories={categories} />
				<AddTransactionForm
					wallets={wallets}
					categories={categories}
					userId={session?.user?.name || ''}
				/>
			</div>
		</main>
	)
}
