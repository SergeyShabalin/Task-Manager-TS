import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BoardAC, CardAC, ColumnAC } from '@/store/board/action'
import {userActions} from '@/toolkit/user/AsyncActions'
import { usersActions } from '@/store/user/asyncActions'

export const useActionsToolkit = () => {
	const dispatch = useDispatch()

	return bindActionCreators(
		{
			...userActions
		},
		dispatch
	)
}
