import React, { useState } from 'react'
import { Button, Checkbox, Input, Loader, Modal } from '@UI/'

import {
	AiOutlinePlus,
	CgMenuGridO,
	GoKebabHorizontal,
	HiOutlineSearch,
	MdKeyboardArrowDown,
	MdOutlineModeEditOutline
} from 'react-icons/all'

import classes from './UIKit.module.css'
import '../GlobalStyles.css'

function submit(e: any) {
	e.preventDefault()
}

export default function UiKit() {
	const [openModal, setOpenModal] = useState(false)
	const [openLoaderWhite, setOpenLoaderWhite] = useState(false)
	const [openLoaderDark, setOpenLoaderDark] = useState(false)
	const [coordinates, setCoordinates] = useState()

	const selectValue = [
		{ id: 1, value: 'item value 1' },
		{ id: 2, value: 'item value 2' },
		{ id: 3, value: 'item value 3' },
		{ id: 4, value: 'item value 4' },
		{ id: 5, value: 'item value 5' },
		{ id: 6, value: 'item value 6' }
	]

	function openWhiteLoader() {
		setOpenLoaderWhite(true)
		setTimeout(() => setOpenLoaderWhite(false), 2000)
	}

	function openDarkLoader(e: any) {
		const coords = e.currentTarget.getBoundingClientRect()
		setCoordinates(coords)
		setOpenLoaderDark(true)
		setTimeout(() => setOpenLoaderDark(false), 2000)
	}

	return (
		<form onSubmit={submit} className={classes.wrapper_uikit}>
			<div className={classes.buttons_text}>
				<Button title='text' />
				<Button title='text start icon' startIcon={<AiOutlinePlus />} />
				<Button title='text end icon' endIcon={<MdKeyboardArrowDown />} />
				<Button disabled title='text disabled' />
			</div>

			<div className={classes.buttons_contained}>
				<Button variant='contained' title='contained' />
				<Button variant='contained' title='contained start icon' startIcon={<AiOutlinePlus />} />
				<Button variant='contained' title='contained end icon' endIcon={<MdKeyboardArrowDown />} />
				<Button variant='contained' disabled={true} title='contained disabled' />
			</div>

			<div className={classes.buttons_outlined}>
				<Button variant='outlined' title='outlined' />
				<Button variant='outlined' title='outlined start icon' startIcon={<AiOutlinePlus />} />
				<Button variant='outlined' title='outlined end icon' endIcon={<MdKeyboardArrowDown />} />
				<Button variant='outlined' disabled={true} title='outlined disabled' />
			</div>

			<div className='button_full_sized'>
				<Button fullSize={true} title='text full size' />
				<Button variant='contained' fullSize={true} title='contained full size' />
				<Button variant='outlined' fullSize={true} title='outlined full size' />
			</div>

			<div className={classes.colors}>
				<div className={classes.colors_variants}>
					<Button color='primary' title='primary' />
					<Button color='error' title='error' />
					<Button color='secondary' title='secondary' />
				</div>
				<div className={classes.colors_variants}>
					<Button color='primary' variant='contained' title='primary' />
					<Button color='error' variant='contained' title='error' />
					<Button color='secondary' variant='contained' title='secondary' />
				</div>
				<div className={classes.colors_variants}>
					<Button color='primary' variant='outlined' title='primary' />
					<Button color='error' variant='outlined' title='error' />
					<Button color='secondary' variant='outlined' title='secondary' />
				</div>
			</div>

			<div className={classes.buttons_only_icon}>
				<Button variant='just_icon' icon={<MdOutlineModeEditOutline />} />
				<Button variant='just_icon' icon={<MdKeyboardArrowDown />} />
				<Button variant='just_icon' icon={<AiOutlinePlus />} />
				<Button variant='just_icon' icon={<GoKebabHorizontal />} />
				<Button variant='just_icon' icon={<CgMenuGridO />} />
				<Button variant='just_icon' disabled icon={<MdOutlineModeEditOutline />} />
				<Button variant='just_icon' disabled icon={<MdKeyboardArrowDown />} />
				<Button variant='just_icon' disabled icon={<AiOutlinePlus />} />
				<Button variant='just_icon' disabled icon={<GoKebabHorizontal />} />
				<Button variant='just_icon' disabled icon={<CgMenuGridO />} />
			</div>
			<hr />

			<div className={classes.other_content}>
				<div className={classes.inputs}>
					<Input
						iconLeft={<Button variant='just_icon' icon={<HiOutlineSearch />} />}
						placeholder='icon left'
					/>
					<Input
						iconRight={<Button variant='just_icon' icon={<HiOutlineSearch />} />}
						placeholder='icon right'
					/>
					<Input disabled placeholder='disabled' />
					<Input placeholder='textarea' cols={25} rows={3} />
					<Input
						rows={3}
						cols={36}
						autoFocus
						variant='large'
						placeholder='Введите название доски'
					/>
				</div>

				<div className={classes.inputs}>
					<Input
						iconLeft={<Button variant='just_icon' icon={<HiOutlineSearch />} />}
						placeholder='icon left'
						color='black'
					/>
					<Input
						iconRight={<Button variant='just_icon' icon={<HiOutlineSearch />} />}
						placeholder='icon right'
						color='black'
					/>
					<Input disabled placeholder='disabled' color='black' />
					<Input placeholder='textarea' cols={25} rows={3} color='black' />
					<Input
						rows={3}
						cols={36}
						autoFocus
						variant='large'
						placeholder='textarea large'
						color='black'
					/>
				</div>
				<div className={classes.inputs}>
					<Input
						iconLeft={<Button variant='just_icon' icon={<HiOutlineSearch />} />}
						placeholder='icon left'
						color='transparent'
					/>
					<Input
						iconRight={<Button variant='just_icon' icon={<HiOutlineSearch />} />}
						placeholder='icon right'
						color='transparent'
					/>
					<Input disabled placeholder='disabled' color='transparent' />
					<Input placeholder='textarea' cols={25} rows={3} color='transparent' />
					<Input
						rows={3}
						cols={36}
						autoFocus
						variant='large'
						placeholder='textarea large'
						color='transparent'
					/>
				</div>
				<div className={classes.modal}>
					<div className={classes.container}>
						<Button variant='contained' onClick={() => setOpenModal(true)}>
							Модалка
						</Button>
						<Modal open={openModal} onClose={() => setOpenModal(false)}>
							<div className={classes.modalContent}>
								<p>Модальное окно</p>
							</div>
						</Modal>
					</div>
				</div>

				<div className={classes.checkbox}>
					<Checkbox label='checkbox with label' />
					<Checkbox label='contained checkbox' variant='contained' />
					<Checkbox label='outlined checkbox' variant='outlined' />
					<Checkbox label='disabled text' disabled={true} />
					<Checkbox variant='contained' label='disabled contained' disabled={true} />
					<Checkbox variant='outlined' label='disabled outlined' disabled={true} />
				</div>

				{openLoaderWhite && <Loader />}
				{/*<div className={classes.load_wrapper}>*/}

			</div>
			<Button
			variant='outlined'
			color='primary'
			title='Лоадер общий'
			onClick={openWhiteLoader}
		/>
			<Button
				startIcon={
					openLoaderDark && <Loader size='small'  color='lds-black' />
				}
				variant='contained'
				color='primary'
				title='Лоадер локальный'
				onClick={e => openDarkLoader(e)}
			/>
		</form>
	)
}
