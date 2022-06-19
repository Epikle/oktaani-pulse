import { Fragment, useState } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [connected, setConnected] = useState(false);
  const [battery, setBattery] = useState(0);
  const [device, setDevice] = useState('');
  const [pulse, setPulse] = useState(0);
  const [pulseLog, setPulseLog] = useState([]);

  const heartRateNotificationHandler = (event) => {
    setPulse(event.target.value.getUint8(1));
    //No need to log 0 values
    if (event.target.value.getUint8(1) > 0) {
      setPulseLog((prevState) =>
        prevState.concat({
          time: Date.now(),
          rate: event.target.value.getUint8(1),
        })
      );
    }
  };

  const batteryValueNotificationHandler = (event) => {
    setBattery(event.target.value.getUint8(0));
  };

  const onDisconnected = () => {
    console.log('Bluetooth Device disconnected...');
    setConnected(false);
    setBattery(0);
    setDevice('');
  };

  const pulseButtonHandler = async () => {
    if (connected) {
      return;
    }
    const filterServices = {
      filters: [{ services: [0x180d] }, { services: ['battery_service'] }],
    };

    try {
      console.log('Requesting Bluetooth Device...');
      const bluetoothDevice = await navigator.bluetooth.requestDevice(
        filterServices
      );
      bluetoothDevice.addEventListener(
        'gattserverdisconnected',
        onDisconnected
      );

      console.log('Connecting to Bluetooth Device...');
      const server = await bluetoothDevice.gatt.connect();
      console.log('Bluetooth Device connected...');

      const batService = await server.getPrimaryService('battery_service');
      const batCharacteristic = await batService.getCharacteristic(
        'battery_level'
      );
      const batValue = await batCharacteristic.readValue();

      const service = await server.getPrimaryService(
        '0000180d-0000-1000-8000-00805f9b34fb' //Heart Rate -service
      );
      const characteristic = await service.getCharacteristic(
        '00002a37-0000-1000-8000-00805f9b34fb' //Heart Rate Measurement -characteristic
      );
      await characteristic.startNotifications();
      await batCharacteristic.startNotifications();

      characteristic.addEventListener(
        'characteristicvaluechanged',
        heartRateNotificationHandler
      );

      batCharacteristic.addEventListener(
        'characteristicvaluechanged',
        batteryValueNotificationHandler
      );

      setConnected(true);
      setBattery(batValue.getUint8(0));
      setDevice(service.device.name);
    } catch (error) {
      console.log('Something went wrong: ', error);
    }
  };

  return (
    <Fragment>
      <Header device={device} batteryValue={battery} />
      <main className="pulse">
        {!connected && 'click'}
        <button className="pulse-heart-btn" onClick={pulseButtonHandler}>
          <span
            className={
              connected
                ? 'material-icons-outlined pulse-heart-icon pulsing'
                : 'material-icons-outlined pulse-heart-icon'
            }
          >
            favorite
          </span>
        </button>
        {!connected ? (
          'to connect'
        ) : (
          <h2>
            {pulse} <span>bpm</span>
          </h2>
        )}
      </main>
      <Footer pulseLog={pulseLog} connected={connected} />
    </Fragment>
  );
}

export default App;
