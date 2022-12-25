import React from 'react'
import Button from './Button.tsx'
import '../../GlobalStyles.css'
import { AiOutlinePlus } from 'react-icons/ai'
import { CgMenuGridO, MdKeyboardArrowDown } from 'react-icons/all.js'


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
	variant: 'outlined',
	icon: <AiOutlinePlus />
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