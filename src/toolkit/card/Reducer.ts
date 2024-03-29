import { defaultState as cardState } from '@/toolkit/card/InitState'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Card } from '@/models/toolkit/Card'


const initialState = {
	cardState
}

export const cardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		startLoadingCard: (state) => {
			state.cardState.isLoading = true
		},
		finishLoadingCard: (state) => {
			state.cardState.isLoading = false
		},
		getCardInfo: (state, action: PayloadAction<Card>) => {
			state.cardState = action.payload
		},
		addNewTask: (state, action: PayloadAction) => {
			state.cardState.cardInfo.checkList.push(action.payload)
		},



	}
})

export const {
	startLoadingCard,
	finishLoadingCard,
	getCardInfo,
	addNewTask,
	changeCard

} = cardSlice.actions

export default cardSlice.reducer