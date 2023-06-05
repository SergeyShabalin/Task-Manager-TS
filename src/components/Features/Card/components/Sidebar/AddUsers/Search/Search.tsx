import React, { ChangeEvent } from 'react';
import { debounce } from 'lodash';
import classes from './Search.module.css';
import { Input } from '@UI';
import { useActions } from '@/hooks/useActions/useActions';

interface UsersProps {
	boardId: string | undefined;
}

export default function Search({ boardId }: UsersProps) {
	const { searchUser } = useActions();

	function applySearch(e: ChangeEvent<HTMLInputElement>) {
		if (boardId) {
			const inputValue = e.target.value;
			const payload = {
				search: inputValue,
				boardId,
			};
			debouncedSearchUser(payload);
		}
	}

	const debouncedSearchUser = debounce(searchUser, 400);

	return (
		<form className={classes.wrapper}>
			<Input placeholder="введите email" color={'blue'} onChange={applySearch} />
		</form>
	);
}