import { addCategory } from '@/data/userActions'
import { revalidatePath } from 'next/cache'

export function AddCategoryForm({ user_id }: { user_id: string }) {
	const handleAddWallet = async (formData: FormData) => {
		'use server'
		const user_id = formData.get('userId')!.toString()
		const category_name = formData.get('categoryName')!.toString()
		if (!category_name) return
		const category = await addCategory(user_id, category_name)
		if (category) {
			revalidatePath('/dashboard/wallets')
			return
		}
	}

	return (
		<div className='w-full h-fit rounded-lg shadow-lg py-3 px-4 flex flex-col '>
			<p className='text-lg flex gap-2 items-center justify-center'>
				Add new category
			</p>

			<form className='flex flex-col gap-2' action={handleAddWallet}>
				<label className='text-sm' htmlFor='categoryName'>
					Category name
				</label>
				<input
					className='w-full h-10 pl-2 pr-2 text-sm rounded-lg border'
					id='categoryName'
					type='text'
					name='categoryName'
					placeholder='Enter category name'
					required
				/>

				<input type='hidden' name='userId' defaultValue={user_id} />
				<button
					type='submit'
					className='mt-2 bg-green-500 hover:bg-green-600 text-white py-1 rounded-md'
				>
					Add category
				</button>
			</form>
		</div>
	)
}
