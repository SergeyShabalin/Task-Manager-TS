import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import {userActions} from '@/toolkit/user/AsyncActions'


export const useActionsToolkit = () => {
	const dispatch = useDispatch()

	return bindActionCreators(
		{
			...userActions
		},
		dispatch
	)
}
