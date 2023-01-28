import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BoardAC, ColumnAC } from '@/store/board/action'
import { CardAC } from '@/store/board/action'
import {
	cardActions,
	columnsActions,
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
			...ColumnAC,
			...boardActions,
			...columnsActions,
			...cardActions,
			...checklistActions,
			...usersActions
		},
		dispatch
	)
}
