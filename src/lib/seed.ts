import bcrypt from 'bcrypt'
import { prisma } from './prisma'

const saltRounds = 10

async function main() {
	// Create some users
	const user1 = await prisma.user.create({
		data: {
			email: 'user1@example.com',
			password: await bcrypt.hash(
				'password1',
				await bcrypt.genSalt(saltRounds)
			),
		},
	})

	const user2 = await prisma.user.create({
		data: {
			email: 'user2@example.com',
			password: await bcrypt.hash(
				'password2',
				await bcrypt.genSalt(saltRounds)
			),
		},
	})

	// Create some wallets for user1
	const wallet1 = await prisma.wallet.create({
		data: {
			name: 'Main Wallet',
			userId: user1.id,
			balance: 1000,
		},
	})

	const wallet2 = await prisma.wallet.create({
		data: {
			name: 'Savings Wallet',
			userId: user1.id,
			balance: 5000,
		},
	})

	// Create some categories for user1
	const category1 = await prisma.category.create({
		data: {
			name: 'Groceries',
			userId: user1.id,
		},
	})

	const category2 = await prisma.category.create({
		data: {
			name: 'Entertainment',
			userId: user1.id,
		},
	})

	// Create some transactions for user1
	await prisma.transaction.create({
		data: {
			userId: user1.id,
			amount: 50,
			categoryId: category1.id,
			walletId: wallet1.id,
			description: 'Grocery shopping at Supermarket',
		},
	})

	await prisma.transaction.create({
		data: {
			userId: user1.id,
			amount: 100,
			categoryId: category2.id,
			walletId: wallet1.id,
			description: 'Movie tickets',
		},
	})

	await prisma.transaction.create({
		data: {
			userId: user1.id,
			amount: 200,
			categoryId: category1.id,
			walletId: wallet2.id,
			description: 'Monthly grocery bulk purchase',
		},
	})

	console.log('Database seeded successfully.')
}

main().catch(e => {
	console.error(e)
})
