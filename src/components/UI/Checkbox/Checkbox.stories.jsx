import Checkbox from './Checkbox.js'

export default {
	title: 'Checkbox',
	component: Checkbox,
	argTypes: {
	variant: {
		type: 'string',
		description: 'Вариант чекбокса',
		options: ['outlined', 'contained', 'text'],
		control: {
			type: 'radio',
			default: 'text'
		}
	}
	}
}

const Template = arg => <Checkbox {...arg} />

export const Default = Template.bind({})
Default.args = {
	label: 'Чекбокс',
	variant: 'text'
}
