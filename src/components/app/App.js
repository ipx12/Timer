import {
	BrowserRouter,
	Routes,
	Route,
} from "react-router-dom";

import { MainPage, Page404, TuskChartPage, TuskInfo } from '../pages';

import './app.scss'


const App = ()  => {

	return (
		<BrowserRouter>
			<div className='app'>
				<Routes>
					<Route path="/" element={<MainPage/>}/>
					<Route path="tuskLog" element={<TuskChartPage/>}/>
					<Route path="task/:taskId" element={<TuskInfo/>}/>
					<Route path="*" element={<Page404/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App