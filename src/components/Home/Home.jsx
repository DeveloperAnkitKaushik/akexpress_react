import { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './index.module.css';

const Home = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState(null);

  const handleSearch = async () => {
    if (trackingCode.trim() === '') {
      alert('Please enter a tracking code.');
      return;
    }

    try {
      const q = query(collection(db, 'shipments'), where('trackingCode', '==', trackingCode.trim()));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setShipment(querySnapshot.docs[0].data());
      } else {
        alert('No shipment found with this tracking code.');
        setShipment(null);
      }
    } catch (error) {
      console.error('Error fetching shipment:', error);
      alert('Error fetching shipment. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className="maincontainer">
        <div className={styles.innercontainer}>
          <div className={styles.herocontent}>
            <h1>More Than Just ✨ <br /> A <span className={styles.highlight}>Logistic</span> Shipment</h1>
            <p>We will deliver your package quickly, safely than any other shipping agency</p>
          </div>
        </div>
      </div>
      <div className={styles.downcontainer}>
        <div className={styles.trackcontainer}>
          <div className={styles.trackheading}>Track Shipment</div>
          <div className={styles.inputcontainer}>
            <input
              className={styles.input}
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              placeholder="Enter the Code"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          {shipment && (
            <div className={styles.shipmentDetails}>
              <p><strong>Tracking Code:</strong> {shipment.trackingCode}</p>
              <p><strong>Sender:</strong> {shipment.sender}</p>
              <p><strong>Receiver:</strong> {shipment.receiver}</p>
              <p><strong>Package Size:</strong> {shipment.packageSize}</p>
              <p><strong>Delivery Address:</strong> {shipment.deliveryAddress}</p>
              <p><strong>Status:</strong> {shipment.status}</p>
            </div>
          )}
        </div>
        <div className={styles.bg}></div>
      </div>
    </div>
  );
};

export default Home;
