import './tabs.scss';
import { NavLink } from "react-router-dom";

const Tabs = () => {
	return (
		<div className="tabs">
			<div className="tabs-item">
				<NavLink end to='/Timer/'>TASK LOG</NavLink>
			</div>
			<div className="tabs-item">
				<NavLink to="/Timer/tuskLog">TASK CHART</NavLink>
			</div>
		</div>
	)
}

export default Tabs;