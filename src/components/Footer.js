import Chart from './Chart';

import './Footer.css';

const Footer = ({ pulseLog, connected }) => {
  if (!connected) {
    return <footer className="copy">2022 &copy; oktaani.com</footer>;
  }

  const labels = pulseLog.map((value) => value.time);
  const rates = pulseLog.map((value) => value.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);

  return (
    <footer>
      <div className="data-container">
        <p>
          <strong>MIN</strong> {minRate}
        </p>
        <p>
          <strong>AVG</strong>{' '}
          {(rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(0)}
        </p>
        <p>
          <strong>MAX</strong> {maxRate}
        </p>
      </div>
      <div className="chart-container">
        <Chart
          labels={labels}
          rates={rates}
          minRate={minRate}
          maxRate={maxRate}
        />
      </div>
    </footer>
  );
};

export default Footer;
