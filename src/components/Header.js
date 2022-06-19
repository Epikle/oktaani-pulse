import Battery from './Battery';

import './Header.css';

const Header = ({ device, batteryValue }) => (
  <header>
    <div className="device-name">
      <h1>{device ? device : 'oktaaniPULSE'}</h1>
    </div>
    {batteryValue > 0 && <Battery value={batteryValue} />}
  </header>
);

export default Header;
