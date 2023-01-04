import '../../App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import UIKit from '@/components/UIKit'
import Main from '@/pages/main'
import UiTest from '@/components/UiTest'

function App() {
	const location = useLocation()
	const background = location.state && location.state.background

	return (
		<>
			<Routes location={background || location}>
				<Route path='/*' element={<Main />} />
				<Route path='/board/:boardId' element={<Main />} />
				<Route path='/ui' element={<UIKit />} />
				<Route path='/test' element={<UiTest />} />
				{/*<Route path="/board/:boardId/card/:cardId" element={<CardModal/>}/>*/}
			</Routes>
			{/*{background && (*/}
			{/*	<Routes>*/}
			{/*<Route path="/board/:boardId/card/:cardId" element={<CardModal/>}/>*/}
			{/*</Routes>*/}
			{/*)}*/}
		</>
	)
}

export default App
