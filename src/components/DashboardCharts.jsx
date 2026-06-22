import { departmentData } from "../data/hiringData";

export function DepartmentChart() {
  const max = Math.max(...departmentData.map((d) => d.value));
  return <div className="bar-chart">{departmentData.map((item) => <div className="bar-column" key={item.label}><div className="bar-value">{item.value}</div><div className="bar-track"><span style={{ height: `${(item.value / max) * 100}%`, background: item.color }} /></div><small>{item.label.slice(0, 3)}</small></div>)}</div>;
}

export function StatusDonut() {
  return <div className="donut-wrap"><div className="donut"><div><strong>124</strong><span>Total</span></div></div><div className="donut-legend"><span><i className="applied" />Applied <b>47</b></span><span><i className="review" />In review <b>31</b></span><span><i className="interview" />Interview <b>24</b></span><span><i className="hired" />Hired <b>22</b></span></div></div>;
}
