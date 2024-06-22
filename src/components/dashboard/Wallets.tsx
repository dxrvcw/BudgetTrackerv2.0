import { getWallets } from '@/data/data'
import Link from 'next/link'
import { FaArrowRightLong } from 'react-icons/fa6'
import { PiWallet } from 'react-icons/pi'
import { Wallet } from './Wallet'

export async function Wallets({
	className,
	user_id,
}: {
	className?: string
	user_id: string
}) {
	const wallets = await getWallets(user_id)

	return (
		<div
			className={`w-full h-full rounded-lg shadow-lg py-3 px-4 flex flex-col ${className}`}
		>
			<p className='text-lg flex gap-2 items-center justify-center'>
				Wallets <PiWallet size={20} />
			</p>
			<div className='flex-grow flex flex-col gap-4'>
				{wallets?.map(wallet => (
					<Wallet key={wallet.id} balance={wallet.balance} name={wallet.name} />
				))}
			</div>
			<div className='flex justify-end'>
				<Link
					href='/dashboard/wallets'
					className='text-lg flex gap-2 items-center hover:underline'
				>
					See all wallets
					<FaArrowRightLong size={16} />
				</Link>
			</div>
		</div>
	)
}
