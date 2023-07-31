import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BoardAC } from '@/store/board/action'
import { CardAC } from '@/store/board/action'
import {
	cardActions,
	boardActions,
	checklistActions,
} from '@/store/board/asyncActions'
import {usersActions} from '@/store/user/asyncActions'

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(
		{
			...BoardAC,
			...CardAC,

			...boardActions,
			...cardActions,
			...checklistActions,
			...usersActions
		},
		dispatch
	)
}
