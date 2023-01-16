import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BoardAC } from '@/store/board/action'
import { CardAC } from '@/store/board/action'
import {
	cardActions,
	columnsActions,
	boardActions,
	checklistActions
} from '@/store/board/asyncActions'

export const useActions = () => {
	const dispatch = useDispatch()

	return bindActionCreators(
		{
			...BoardAC,
			...CardAC,
			...boardActions,
			...columnsActions,
			...cardActions,
			...checklistActions
		},
		dispatch
	)
}
