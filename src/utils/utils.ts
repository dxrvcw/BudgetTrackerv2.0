export function getStartOfMonth(): Date {
	const now = new Date()
	return new Date(now.getFullYear(), now.getMonth(), 1)
}
