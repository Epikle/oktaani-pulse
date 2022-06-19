import './Battery.css';

const Battery = ({ value }) => (
  <div className="battery-container">
    <div className="battery-value">{value} %</div>
    <div className="battery-icon">
      <div
        className="battery-icon-value"
        style={{ '--batt-val': `${value}%` }}
      ></div>
    </div>
  </div>
);

export default Battery;
