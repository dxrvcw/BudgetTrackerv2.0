'use client'

import { ICategory, IWallet } from '@/utils/definitions'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'
import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

interface ISearchBar {
	wallets: IWallet[]
	categories: ICategory[]
}

export function SearchBar({ wallets, categories }: ISearchBar) {
	const [searchParams, setSearchParams] = useState<{
		wallets: string[]
		categories: string[]
		dateFrom: Dayjs | null
		dateTo: Dayjs | null
	}>({
		wallets: [],
		categories: [],
		dateFrom: null,
		dateTo: null,
	})

	const pathname = usePathname()
	const router = useRouter()

	useEffect(() => {
		const query = new URLSearchParams()

		if (searchParams.wallets.length > 0)
			query.set('wallets', searchParams.wallets.join(','))
		if (searchParams.categories.length > 0)
			query.set('categories', searchParams.categories.join(','))
		if (searchParams.dateFrom)
			query.set('dateFrom', searchParams.dateFrom.format('YYYY-MM-DD'))
		if (searchParams.dateTo)
			query.set('dateTo', searchParams.dateTo.format('YYYY-MM-DD'))

		router.replace(pathname + '?' + query.toString())
	}, [pathname, searchParams])

	const handleCheckbox = (
		e: ChangeEvent<HTMLInputElement>,
		type: 'wallets' | 'categories'
	) => {
		const newList = searchParams[type]

		const newItem = e.target.value
		const index = newList.indexOf(newItem)

		if (index === -1) newList.push(newItem)
		else newList.splice(index, 1)

		setSearchParams(prev => ({
			...prev,
			[type]: newList,
		}))
	}

	return (
		<aside className='w-full shadow-md rounded-lg flex flex-col items-center gap-2 py-4 px-6'>
			<p className='text-xl'>Search</p>
			<p className='mt-4'>Wallets: </p>
			{wallets.map(wallet => (
				<div
					key={wallet.id}
					className='flex justify-between w-full border-b px-4 '
				>
					<p>{wallet.name}</p>
					<input
						type='checkbox'
						key={wallet.id}
						value={wallet.id}
						onChange={e => handleCheckbox(e, 'wallets')}
						checked={searchParams.wallets.includes(wallet.id)}
					/>
				</div>
			))}
			<p className='mt-4'>Categories:</p>
			{categories.map(category => (
				<div
					key={category.id}
					className='flex justify-between w-full border-b px-4 '
				>
					<p>{category.name}</p>
					<input
						type='checkbox'
						key={category.id}
						value={category.id}
						onChange={e => handleCheckbox(e, 'categories')}
						checked={searchParams.categories.includes(category.id)}
					/>
				</div>
			))}
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePicker
					label='Select date from: '
					value={searchParams.dateFrom}
					className='mt-4'
					onChange={newDate =>
						setSearchParams(prev => ({ ...prev, dateFrom: newDate }))
					}
				/>
				<DatePicker
					label='Select date to: '
					value={searchParams.dateTo}
					onChange={newDate =>
						setSearchParams(prev => ({ ...prev, dateTo: newDate }))
					}
				/>
			</LocalizationProvider>
		</aside>
	)
}
