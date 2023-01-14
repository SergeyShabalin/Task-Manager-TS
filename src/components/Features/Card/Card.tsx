import React, { useEffect } from 'react'
import { Modal } from '@UI'
import { useNavigate, useParams } from 'react-router-dom'

import classes from './Card.module.css'
import Header from './components/Header/Header'
import { useActions } from '@/hooks/useActions/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector/useTypedSelector'
import Description from '@/components/Features/Card/components/Description'

export default function Card () {

	const navigate = useNavigate()
	const { boardId, cardId } = useParams()
	const cardInfo = useTypedSelector(state => state.board.cardInfo)
	const { getOneCard } = useActions()

	useEffect(()=>{
	if(cardId) getOneCard(cardId)
	}, [])

	function closeModal(){
		navigate(`/board/${boardId}`);
	}

	return (
		<Modal onClose={closeModal} open>
			<div className={classes.card_modal_wrapper}>
				<Header closeModal={closeModal}  title={cardInfo.header}/>
				<Description description='описание' />
				 </div>
		</Modal>
	)
}
