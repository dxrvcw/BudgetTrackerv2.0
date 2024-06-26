export interface ITransaction {
	id: string
	userId: string
	amount: number
	date: Date
	categoryId: string
	walletId: string
	description: string | null
}

export interface IWallet {
	id: string
	userId: string
	name: string
	balance: number
}

export interface ICategory {
	id: string
	userId: string
	name: string
}
