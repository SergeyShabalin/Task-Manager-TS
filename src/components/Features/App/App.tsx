import '../../../App.css'
import { Routes, Route, useLocation } from 'react-router-dom'

import '../../../GlobalStyles.css'

import Main from '@/layouts/Main'
import UiKit from '@/components/UIKit'
import { Card } from '@Features'


function App() {
	const location = useLocation()
	const background = location.state && location.state.background

	return (
		<>
			<>
				<Routes location={background || location}>
					<Route path="/*" element={<Main/>} />
					<Route path="/board/:boardId" element={<Main/>}/>
					<Route path="/ui" element={<UiKit />} />
					<Route path="/board/:boardId/card/:cardId" element={<Card/>}/>
				</Routes>
				{background && (
					<Routes>
						<Route path="/board/:boardId/card/:cardId" element={<Card/>}/>
					</Routes>
				)}
			</>
		</>
	)
}

export default App
