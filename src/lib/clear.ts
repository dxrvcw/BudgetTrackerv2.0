import { prisma } from './prisma'

async function clearDatabase() {
	await prisma.transaction.deleteMany({})
	await prisma.wallet.deleteMany({})
	await prisma.category.deleteMany({})
	await prisma.user.deleteMany({})

	console.log('Database cleared successfully.')
}

clearDatabase().catch(e => {
	console.error(e)
	process.exit(1)
})
