'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { revalidatePath } from 'next/cache'

export async function registerUser(email: string, password: string) {
	const user = await prisma.user.create({
		data: {
			email,
			password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
		},
	})
	return user
}

export async function addWallet(
	user_id: string,
	name: string,
	balance: number
) {
	try {
		const wallet = await prisma.wallet.create({
			data: {
				userId: user_id,
				name,
				balance,
			},
		})
		return wallet
	} catch {
		return null
	}
}

export async function deleteWallet(wallet_id: string) {
	try {
		await prisma.wallet.delete({
			where: {
				id: wallet_id,
			},
		})
		revalidatePath('/dashboard/:path*')
		return { status: 'success' }
	} catch {
		return { status: 'error' }
	}
}

export async function updateWallet(
	wallet_id: string,
	name: string,
	balance: number
) {
	try {
		const newWallet = await prisma.wallet.update({
			where: {
				id: wallet_id,
			},
			data: {
				name,
				balance,
			},
		})
		revalidatePath('/dashboard/:path*')
		return newWallet
	} catch {
		return null
	}
}

export async function addCategory(user_id: string, category_name: string) {
	try {
		const category = await prisma.category.create({
			data: {
				name: category_name,
				userId: user_id,
			},
		})
		return category
	} catch {
		return null
	}
}

export async function deleteCategory(category_id: string) {
	try {
		await prisma.category.delete({
			where: {
				id: category_id,
			},
		})
		revalidatePath('/dashboard/:path*')
		return { status: 'success' }
	} catch {
		return { status: 'error' }
	}
}

export async function updateCategory(category_id: string, name: string) {
	try {
		const newCategory = await prisma.category.update({
			where: {
				id: category_id,
			},
			data: {
				name,
			},
		})
		revalidatePath('/dashboard/:path*')
		return newCategory
	} catch {
		return null
	}
}

export async function addTransaction(
	user_id: string,
	category_id: string,
	wallet_id: string,
	date: string,
	amount: number,
	description?: string
) {
	const wallet = await prisma.wallet.findFirst({ where: { id: wallet_id } })
	if (!wallet || wallet?.balance < amount) return

	const newTransaction = await prisma.transaction.create({
		data: {
			userId: user_id,
			categoryId: category_id,
			walletId: wallet_id,
			date: date,
			description: description,
			amount,
		},
	})

	await prisma.wallet.update({
		where: {
			id: wallet_id,
		},
		data: {
			balance: wallet.balance - amount,
		},
	})

	revalidatePath('/dashboard/:path*')
	return newTransaction
}

export async function deleteTransaction(transaction_id: string) {
	const transaction = await prisma.transaction.findFirst({
		where: {
			id: transaction_id,
		},
	})

	if (!transaction) return { status: 'Cannot find transaction!' }

	const wallet = await prisma.wallet.findFirst({
		where: {
			id: transaction.walletId,
		},
	})

	if (!wallet) return { status: 'Cannot find wallet!' }

	if (wallet.balance < transaction.amount && transaction.amount > 0)
		return { status: 'Insufficient funds!' }

	await prisma.wallet.update({
		where: {
			id: transaction.walletId,
		},
		data: {
			balance: wallet.balance - transaction.amount,
		},
	})

	await prisma.transaction.delete({
		where: {
			id: transaction_id,
		},
	})
	revalidatePath('/dashboard/:path*')
	return { status: 'Success!' }
}

export async function editTransaction(
	transaction_id: string,
	description: string,
	amount: string,
	date: string,
	wallet_id: string,
	category_id: string
) {
	const newWallet = await prisma.wallet.findFirst({
		where: {
			id: wallet_id,
		},
	})
	if (!newWallet) return { status: 'Cannot find wallet!' }

	const transaction = await prisma.transaction.findFirst({
		where: {
			id: transaction_id,
		},
	})
	if (!transaction) return { status: 'Cannot find transaction!' }

	const oldWallet = await prisma.wallet.findFirst({
		where: {
			id: transaction.walletId,
		},
	})
	if (!oldWallet) return { status: 'Cannot find wallet!' }

	const oldWalletBalance = oldWallet.balance - +amount
	const newWalletBalance = newWallet.balance + +amount

	if (oldWalletBalance < 0 || newWalletBalance < 0) {
		return { status: 'Insufficient funds!' }
	}

	await prisma.transaction.update({
		where: {
			id: transaction_id,
		},
		data: {
			description: description,
			amount: +amount,
			date: date,
			walletId: wallet_id,
			categoryId: category_id,
		},
	})
	await prisma.wallet.update({
		where: {
			id: oldWallet.id,
		},
		data: {
			balance: oldWalletBalance,
		},
	})
	await prisma.wallet.update({
		where: {
			id: newWallet.id,
		},
		data: {
			balance: newWalletBalance,
		},
	})
	revalidatePath('/dashboard/:path*')
	return { status: 'Success!' }
}
