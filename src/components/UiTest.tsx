import React, { useState } from 'react'
import Card from '@/components/App/Cards'
import { ModalHeader } from '@/components/App/ModalHeader'
import Description from '@/components/App/ModalDescription'

export default function UiTest() {
	function closeModal() {
		console.log('закрыто')
	}

	return (
		<div>
			<Card />
			<ModalHeader closeModal={closeModal} title='Название карточки в модальном окне' />
			<Description/>
		</div>
	)
}
