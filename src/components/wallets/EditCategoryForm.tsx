'use client'

import { updateCategory } from '@/data/userActions'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { MdClose } from 'react-icons/md'

interface IEditCategory {
	category_id: string
	name: string
}

export function EditCategoryForm({ category_id, name }: IEditCategory) {
	const [isOpen, setIsOpen] = useState(false)

	const handleEdit = async (formData: FormData) => {
		const name = formData.get('categoryName')?.toString()
		if (!name) return
		await updateCategory(category_id, name)
		setIsOpen(false)
	}

	return (
		<div>
			{isOpen &&
				createPortal(
					<div className='absolute top-0 left-0 w-screen h-screen bg-black/20 flex justify-center items-center'>
						<form
							action={handleEdit}
							className='w-1/2 h-fit bg-white relative py-6 px-8 rounded-md'
						>
							<button
								onClick={() => setIsOpen(false)}
								className='absolute top-2 right-2 text-xl'
							>
								<MdClose />
							</button>

							<label className='text-sm' htmlFor='categoryName'>
								Category name
							</label>
							<input
								className='w-full h-10 pl-2 pr-2 text-sm rounded-lg border'
								id='categoryName'
								type='text'
								name='categoryName'
								placeholder='Enter wallet name'
								defaultValue={name}
							/>
							<button
								type='submit'
								className=' bg-yellow-200 hover:bg-yellow-300 py-1 rounded-md w-full mt-6'
							>
								Edit category
							</button>
						</form>
					</div>,
					document.body
				)}
			<button
				className='bg-yellow-300 px-2 py-1 rounded-md'
				onClick={() => setIsOpen(true)}
			>
				Edit
			</button>
		</div>
	)
}
