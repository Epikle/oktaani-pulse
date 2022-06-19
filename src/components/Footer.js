import './Footer.css';

const Footer = ({ pulseLog, connected }) => {
  if (!connected) {
    return <footer className="copy">2022 &copy; oktaani.com</footer>;
  }
  return (
    <footer>
      {/* *WIP, line graph* */}
      <p>MIN: {Math.min(...pulseLog)} bpm</p>
      <p>MAX: {Math.max(...pulseLog)} bpm</p>
      <p>
        AVG:{' '}
        {(pulseLog.reduce((a, b) => a + b, 0) / pulseLog.length).toFixed(0)} bpm
      </p>
    </footer>
  );
};

export default Footer;
