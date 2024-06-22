import { HeaderProfile } from './HeaderProfile'

export function Header() {
	return (
		<header className='shadow-md py-4 '>
			<div className='container  m-auto flex justify-between items-center'>
				<p className='text-xl '>Budget Tracker</p>
				<HeaderProfile />
			</div>
		</header>
	)
}
