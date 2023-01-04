import '../../App.css'
import { Routes, Route, useLocation } from 'react-router-dom'

import '../../GlobalStyles.css'

import Main from '@/layouts/Main'


function App() {
	const location = useLocation()
	const background = location.state && location.state.background

	return (
		<>

			<Main/>
		</>
	)
}

export default App
