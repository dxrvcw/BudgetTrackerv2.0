import { authConfig } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'

import { CardGroup } from '@/components/dashboard/CardGroup'
import { TransactionTable } from '@/components/dashboard/TransactionTable'
import { Wallets } from '@/components/dashboard/Wallets'

import { CardGroupSkeleton } from '@/components/dashboard/skeletons/CardGroupSkeleton'
import { TransactionTableSkeleton } from '@/components/dashboard/skeletons/TransactionTableSkeleton'
import { WalletsSkeleton } from '@/components/dashboard/skeletons/WalletsSkeleton'
import { Suspense } from 'react'

export const revalidate = 1

export default async function DashboardPage() {
	const session = await getServerSession(authConfig)

	return (
		<div className='flex flex-col h-screen gap-10'>
			<p className='text-sm'>Dashboard / Overview</p>
			<Suspense fallback={<CardGroupSkeleton className='' />}>
				<CardGroup user_id={session?.user?.name!} />
			</Suspense>
			<div className='flex flex-grow gap-6 flex-col items-center lg:flex-row'>
				<Suspense fallback={<TransactionTableSkeleton className='basis-2/3' />}>
					<TransactionTable
						className='basis-2/3'
						user_id={session?.user?.name!}
					/>
				</Suspense>
				<Suspense fallback={<WalletsSkeleton className='basis-1/3' />}>
					<Wallets
						className='basis-1/3'
						user_id={session?.user?.name!}
						controls={false}
					/>
				</Suspense>
			</div>
		</div>
	)
}
