export function CardGroupSkeleton({ className }: { className: string }) {
	return (
		<div
			className={`${className} h-20 rounded-xl flex justify-between 
	`}
		>
			<div className='h-full bg-gray-100 dark:bg-gray-300 w-[17rem] animate-pulse rounded-lg'></div>
			<div className='h-full bg-gray-100 dark:bg-gray-300 w-[17rem] animate-pulse rounded-lg'></div>
			<div className='h-full bg-gray-100 dark:bg-gray-300 w-[17rem] animate-pulse rounded-lg'></div>
			<div className='h-full bg-gray-100 dark:bg-gray-300 w-[17rem] animate-pulse rounded-lg'></div>
		</div>
	)
}
