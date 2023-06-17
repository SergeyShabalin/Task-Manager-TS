import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import {userActions} from '@/toolkit/user/AsyncActions'
import { boardActions } from '@/toolkit/board/AsyncActions'


export const useActionsToolkit = () => {
	const dispatch = useDispatch()

	return bindActionCreators(
		{
			...userActions,
			...boardActions
		},
		dispatch
	)
}
