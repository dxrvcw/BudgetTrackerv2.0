import { MdDateRange } from 'react-icons/md'

export function TransactionTableSkeleton({ className }: { className: string }) {
	return (
		<div
			className={`w-full h-full rounded-lg shadow-lg flex flex-col py-3 px-4 ${className}`}
		>
			<p className='ml-6 text-lg flex gap-2 items-center justify-center'>
				Month transactions <MdDateRange size={20} />
			</p>

			<div className='flex flex-col mt-6 flex-grow gap-4'>
				<div className='grid grid-cols-4 overflow-y-scroll'>
					<p className='border-r-2 text-center py-1 border-b-2'>Date</p>
					<p className='border-r-2 text-center py-1 border-b-2'>Category</p>
					<p className='border-r-2 text-center py-1 border-b-2'>Wallet</p>
					<p className='text-center py-1 border-b-2'>Amount</p>
				</div>
				<div className='w-full h-6 bg-gray-100 dark:bg-gray-300 animate-pulse rounded-xl'></div>
				<div className='w-full h-6 bg-gray-100 dark:bg-gray-300 animate-pulse rounded-xl'></div>
				<div className='w-full h-6 bg-gray-100 dark:bg-gray-300 animate-pulse rounded-xl'></div>
				<div className='w-full h-6 bg-gray-100 dark:bg-gray-300 animate-pulse rounded-xl'></div>
				<div className='w-full h-6 bg-gray-100 dark:bg-gray-300 animate-pulse rounded-xl'></div>
			</div>
		</div>
	)
}
