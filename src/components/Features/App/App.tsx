import '../../../App.css'
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom'

import '../../../GlobalStyles.css'

import Main from '@/layouts/Main'
import UiKit from '@/components/UIKit'
import { Card } from '@Features'
import Registration from '@/pages/registration'
import Login from '@/pages/login/Login'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useEffect } from 'react'
import { useActions } from '@/hooks/useActions/useActions'
import { UserAC } from '@/store/user/action'
import { useDispatch } from 'react-redux'

function App() {
	const location = useLocation()
	const background = location.state && location.state.background
	const isAuth = useTypedSelector(state => state.user.isAuth)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			dispatch(UserAC.checkLogin(true))
		} else {
			dispatch(UserAC.checkLogin(false))
			navigate(`/login`)
		}
	}, [])

	return (
		<>
			{!isAuth ? (
				<Routes location={background || location}>
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			) : (
				<>
					<Routes location={background || location}>
						<Route path='/*' element={<Main />} />
						<Route path='/user/:userId' element={<Main />} />
						<Route path='/user/:userId/board/:boardId' element={<Main />} />
						<Route path='/ui' element={<UiKit />} />
						<Route path='/user/:userId/board/:boardId/card/:cardId' element={<Card />} />
					</Routes>
					{background && (
						<Routes>
							<Route path='/user/:userId/board/:boardId/card/:cardId' element={<Card />} />
						</Routes>
					)}
				</>
			)}
		</>
	)
}

export default App
