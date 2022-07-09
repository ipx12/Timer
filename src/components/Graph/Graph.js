import React, { useEffect, useState, useCallback } from "react";
import { v4 as uuid } from 'uuid';

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend
} from "recharts";
import { selectTimers, onGenerate } from "../Timer/timerSlice";
import { useSelector, useDispatch } from "react-redux";

import Button from '@mui/material/Button';

import './graph.scss'




const Graph = () =>  {

	const [graph, setGraph] = useState([]);
	const dispatch = useDispatch();

	const {timers} = useSelector(selectTimers);

	const createGraph = useCallback(() => {
		const data = [];
		for (let i = 0; i < 24; i++) {
			data.push({name: i, minutes: 0})
		}

		timers.forEach(timer => {
			let date = new Date(timer.timeStartMs);
			let minutes = Math.floor(((timer.timeEndMs - timer.timeStartMs) / 1000 / 60) % 60)

			for (let i = minutes; i !== 0; i--) {
				data.forEach(item => {
					if (item.name === date.getHours() && minutes !== 0) {
						if (item.minutes !== 60) {
							item.minutes += 1;
						}
					}
				})
				date.setMinutes(date.getMinutes() + 1);
			}
	
		})

		setGraph(data)
	})

	useEffect(() => {
		createGraph();
	},[timers])


	return (
		<div className="graph">
			<BarChart
				width={1000}
				height={400}
				data={graph}
				margin={{
				top: 20,
				bottom: 5
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis ticks={[0, 15, 30, 45, 60]}/>
				<Tooltip/>
				<Legend />
				<Bar dataKey="minutes" barSize={20} fill="#8884d8" />
			</BarChart>
			<Button onClick={() => dispatch(onGenerate())}>Generate</Button>
		</div>
	);
}

export default Graph;




