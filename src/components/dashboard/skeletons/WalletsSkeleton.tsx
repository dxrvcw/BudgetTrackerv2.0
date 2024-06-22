import { PiWallet } from 'react-icons/pi'

export function WalletsSkeleton({ className }: { className: string }) {
	return (
		<div
			className={`${className} w-full h-full rounded-lg shadow-lg py-3 px-4 flex flex-col`}
		>
			<p className='text-lg flex gap-2 items-center justify-center'>
				Wallets <PiWallet size={20} />
			</p>
			<div className='flex-grow flex flex-col gap-4'>
				<div
					className='w-full h-16 rounded-xl
				 bg-gray-100 dark:bg-gray-300 animate-pulse mt-4'
				></div>
				<div
					className='w-full h-16 rounded-xl
				 bg-gray-100 dark:bg-gray-300 animate-pulse'
				></div>
				<div
					className='w-full h-16 rounded-xl
				 bg-gray-100 dark:bg-gray-300 animate-pulse'
				></div>
				<div
					className='w-full h-16 rounded-xl
				 bg-gray-100 dark:bg-gray-300 animate-pulse'
				></div>
			</div>
		</div>
	)
}
