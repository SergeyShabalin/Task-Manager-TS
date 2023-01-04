import React from 'react'
import Button from './Button.tsx'
import '../../../GlobalStyles.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/all.js'
import { AiOutlineBgColors } from 'react-icons/all'


export default {
	title: 'Button',
	component: Button,
	argTypes: {
		variant: {
			type: 'string',
			description: 'Внешний вид кнопки',
			options: ['outlined', 'contained', 'text'],
			control: {
				type: 'radio',
				default: 'text'
			}
		},
		color: {
			type: 'string',
			description: 'Тип кнопки',
			options: ['btn', 'error', 'submit'],
			control: {
				type: 'radio',
				default: 'btn'
			}
		},

		color_icon: {
			type: 'string',
			description: 'Цвет для кнопки "только иконка" ',
			options: [ 'red', 'green' , 'blue'],
			control: {
				type: 'radio',
				default: 'btn'
			}
		}

	}
}

const Template = arg => <Button {...arg} />

export const Default = Template.bind({})
Default.args = {
	label: 'default btn',
	variant: 'outlined'
}

export const onlyIcon = Template.bind({})
onlyIcon.args = {
	variant: 'just_icon',
	icon: <AiOutlineBgColors />
}

export const startIcon = Template.bind({})
startIcon.args = {
	label: 'start icon btn',
	variant: 'outlined',
	startIcon: <AiOutlinePlus />
}

export const endIcon = Template.bind({})
endIcon.args = {
	label: 'start icon btn',
	variant: 'outlined',
	endIcon: <MdKeyboardArrowDown />
}