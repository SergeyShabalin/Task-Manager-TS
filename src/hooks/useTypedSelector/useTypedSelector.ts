import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../../toolkit/index';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;