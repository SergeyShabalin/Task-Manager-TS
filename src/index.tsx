import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from './store/index'
import { App } from '@Features'
import './index.css'

const rootElement = document.getElementById("root");
// @ts-ignore
const root = createRoot(rootElement);

root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)
