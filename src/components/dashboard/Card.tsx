interface ICardProps {
	label: string
	icon: React.ReactNode
	type: 'money' | 'raw'
	value: number
	className?: string
	iconColor?: string
}

export function Card({
	label,
	icon,
	type,
	value,
	className,
	iconColor,
	...props
}: ICardProps) {
	return (
		<div
			className={
				'flex w-[17rem] rounded-lg justify-between gap-2 h-20 border items-end relative px-3 py-3 shadow-md' +
				' ' +
				className
			}
			{...props}
		>
			<p className='text-sm'>{label}</p>
			<p className='text-3xl font-light'>
				{type === 'money' ? '$' + value : value}
			</p>
			<div
				className={`${iconColor} p-4 text-white text-2xl rounded-lg absolute -left-4 -top-4 shadow-md`}
			>
				{icon}
			</div>
		</div>
	)
}
