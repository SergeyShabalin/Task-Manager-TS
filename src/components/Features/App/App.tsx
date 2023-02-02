import '../../../App.css'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import '../../../GlobalStyles.css'

import Main from '@/layouts/Main'
import UiKit from '@/components/UIKit'
import { Card } from '@Features'
import Registration from '@/pages/registration'
import Login from '@/pages/login/Login'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import { useEffect } from 'react'
import { UserAC } from '@/store/user/action'
import { useActions } from '@/hooks/useActions/useActions'


function App() {
	const location = useLocation()
	const background = location.state && location.state.background
	const isAuth = useTypedSelector(state => state.user.isAuth)
	const user = useTypedSelector(state => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { checkLogin } = useActions()


	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			 checkLogin()
			console.log({ user })
		} else {

			const payload = {
				isAuth: false,
				user:{}
			}
			dispatch(UserAC.checkLogin(payload))
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
