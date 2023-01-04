import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BoardAC } from '@/store/board/action'
import { getCurrentBoard } from '@/store/board/asyncActions'


export const useActions = () => {
	const dispatch = useDispatch();

	return bindActionCreators({ ...BoardAC, getCurrentBoard }, dispatch);
};