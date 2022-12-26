import Input from './Input'
import '../../GlobalStyles.css'

export default {
	title: 'Input',
	component: Input,
	argTypes: {
		variant: {
			type: 'string',
			description: 'Вариант инпута',
			options: ['input', 'just_icon', 'transparent'],
			control: {
				type: 'radio',
				default: 'text'
			}
		},
		container: {
			type: 'string',
			options: ['input_container', 'custom'],
			control: {
				type: 'radio',
				default: 'text'
			}
		}
	}
}

const Template = arg => <Input {...arg} />

export const Default = Template.bind({})
Default.args = {
	label: 'Заголовок инпута',
	variant: 'input',
	defaultValue: 'текст инпута'
}