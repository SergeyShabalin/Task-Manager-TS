import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Main from '@/layouts/Main'
import UiKit from '@/components/UIKit'
import Registration from '@/pages/registration'
import Login from '@/pages/login/Login'
import Greeting from '@/pages/greeting'
import { Card } from '@Features'
import { useActions } from '@/hooks/useActions/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import '../../../GlobalStyles.css'
import Configuration from '@/pages/configuration'
import AvatarEdit from '@/pages/configuration/Profile/AvatarEdit'
import BackgroundEdit from '@/pages/configuration/Profile/BackgroundEdit'
import Profile from '@/components/Features/Profile'

function App() {
	const location = useLocation()
	const { checkLogin } = useActions()
	const
		background = location.state && location.state.background,
		isAuth = useTypedSelector(state => state.user.isAuth),
		user = useTypedSelector(state => state.user),
		socket = user.socket


	useEffect(() => {
		socket?.connect()
		checkLogin()
	}, [])

	useEffect(() => {
		socket?.emit('JOIN_USER', user._id)
	}, [socket])

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
						<Route path='/user/:userId/greeting' element={<Greeting />} />
						<Route path='/user/:userId/profile' element={<Profile />} />
						<Route path='/user/:userId/configuration/*' element={<Configuration />} />
						<Route path='/user/:userId/board/:boardId' element={<Main />} />
						<Route path='/ui' element={<UiKit />} />
						<Route path='/user/:userId/board/:boardId/card/:cardId' element={<Card />} />
					</Routes>
					{background && (
						<Routes>
							<Route path='/user/:userId/greeting' element={<Greeting />} />
							<Route path='/user/:userId/board/:boardId/card/:cardId' element={<Card />} />
							<Route path='/user/:userId/configuration/avatarEdit' element={<AvatarEdit />} />
							<Route path='/user/:userId/configuration/backgroundEdit' element={<BackgroundEdit />} />
						</Routes>
					)}
				</>
			)}
		</>
	)
}

export default App

