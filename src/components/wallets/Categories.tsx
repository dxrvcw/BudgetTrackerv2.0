import { getCategories } from '@/data/data'
import { DeleteForm } from './DeleteForm'
import { EditCategoryForm } from './EditCategoryForm'

export async function Categories({ user_id }: { user_id: string }) {
	const categories = await getCategories(user_id)

	return (
		<div className='w-full h-fit rounded-lg shadow-lg py-3 px-4 flex flex-col mb-6 '>
			<p className='text-lg flex gap-2 items-center justify-center'>
				Categories
			</p>
			{categories?.map(category => (
				<div
					key={category.id}
					className='w-full rounded-md shadow-md px-4 py-2 flex justify-between items-center mt-2'
				>
					<p>{category.name}</p>
					<div className='flex gap-2'>
						<EditCategoryForm category_id={category.id} name={category.name} />

						<DeleteForm type='Category' id={category.id} />
					</div>
				</div>
			))}
		</div>
	)
}
