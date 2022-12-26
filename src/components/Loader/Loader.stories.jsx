import Loader from './Loader'

export default {
	title: 'Loader',
	component: Loader,
	argTypes: {
		size: {
			type: 'string',
			description: 'Размер лоадера',
			options: ['small', 'normal', 'big', 'large'],
			control: {
				type: 'radio',
				default: 'big'
			}
		}
	}
}

const Template = arg => <Loader {...arg} />

export const main = Template.bind({})
main.args = {
	label: 'mail loader',
	variant: 'lds_wrapper',
	color: 'lds-roller'
}
export const local = Template.bind({})
local.args = {
	label: 'mail loader',
	variant: 'lds_wrapper',
	color: 'black'
}
