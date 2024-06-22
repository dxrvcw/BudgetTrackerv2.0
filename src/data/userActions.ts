'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function registerUser(email: string, password: string) {
	try {
		const user = await prisma.user.create({
			data: {
				email,
				password: await bcrypt.hash(password, await bcrypt.genSalt(10)),
			},
		})
		return user
	} catch {
		return null
	}
}
