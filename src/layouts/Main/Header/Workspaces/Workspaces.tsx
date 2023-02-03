import { Link, useLocation } from 'react-router-dom'
import classes from './Workspaces.module.css'
import './Colors.css'
import { useDispatch, useSelector } from 'react-redux'
import useOpenClose from '@/hooks/UseOpenClose'
import { Button } from '@UI'
import { MdKeyboardArrowDown } from 'react-icons/all'
import { useEffect } from 'react'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'

export default function Workspaces() {

	const dispatch = useDispatch();
	const location = useLocation();
	const { onOpen, onClose, isOpen } = useOpenClose();

const allUserBoards =	useTypedSelector(state => state.user.boardIds);

	useEffect(() => {
		// dispatch(getAllBoard());
	}, []);

	function setBoard(boardId) {

		onClose();
	}

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	const colorsIcon = ["iconRed", "iconBlue", "iconGreen", "iconYellow", "iconMagenta",
		"iconDark", "iconGrBl", "iconOrange"];

	return (
		<div>
			<Button
				onClick={onOpen}
				variant="text"
				name="work_area"
				title="Рабочие доски"
				endIcon={<MdKeyboardArrowDown />}
			/>

		</div>
	);
};