import { Wallets } from '@/components/dashboard/Wallets'
import { AddCategoryForm } from '@/components/wallets/AddCategoryForm'
import { AddWalletForm } from '@/components/wallets/AddWalletForm'
import { Categories } from '@/components/wallets/Categories'
import { authConfig } from '@/configs/auth'
import { getServerSession } from 'next-auth/next'

export default async function WalletsPage() {
	const session = await getServerSession(authConfig)

	return (
		<div className='flex flex-col h-screen gap-10 py-4'>
			<div className='flex gap-4 py-4 flex-col md:flex-row'>
				<div className='basis-1/2'>
					<Wallets
						user_id={session?.user?.name!}
						link={false}
						className='h-fit mb-6'
						controls={true}
					/>
					<AddWalletForm user_id={session?.user?.name!} />
				</div>
				<div className='basis-1/2'>
					<Categories user_id={session?.user?.name!} />
					<AddCategoryForm user_id={session?.user?.name!} />
				</div>
			</div>
		</div>
	)
}
