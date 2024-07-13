'use server'

import { prisma } from '@/lib/prisma'
import { unstable_noStore as noStore } from 'next/cache'

export const getWallets = async (user_id: string) => {
	noStore()
	const wallets = prisma?.wallet.findMany({
		where: {
			userId: user_id,
		},
	})
	return wallets || []
}

export const getTransactions = async (
	user_id: string,
	date_from?: string,
	date_to?: string,
	category_id?: string[] | string,
	wallet_id?: string[] | string
) => {
	noStore()

	const whereClause: any = { userId: user_id }

	if (date_from) {
		whereClause.date = { ...whereClause.date, gte: new Date(date_from) }
	}
	if (date_to) {
		whereClause.date = { ...whereClause.date, lte: new Date(date_to) }
	}
	if (category_id) {
		whereClause.categoryId = { in: category_id }
	}
	if (wallet_id) {
		whereClause.walletId = { in: wallet_id }
	}

	const transactions = await prisma?.transaction.findMany({
		where: { ...whereClause },
	})

	return transactions
}

export const getCategories = async (user_id: string) => {
	noStore()
	const categories = await prisma?.category.findMany({
		where: {
			userId: user_id,
		},
	})
	return categories || []
}
