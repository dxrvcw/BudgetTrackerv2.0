import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { AuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const authConfig: AuthOptions = {
	providers: [
		Credentials({
			credentials: {
				email: { label: 'email', type: 'email', required: true },
				password: { label: 'password', type: 'password', required: true },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null

				const user = await prisma?.user.findFirst({
					where: {
						email: credentials.email,
					},
				})
				if (!user) return null

				if (await bcrypt.compare(credentials.password, user?.password))
					return { email: user.email, name: user.id } as User

				return null
			},
		}),
	],
	pages: {
		signIn: '/sign-in',
		newUser: '/register',
	},
}
