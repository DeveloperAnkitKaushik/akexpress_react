import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import styles from './index.module.css';

const AdminPanel = () => {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const shipmentSnapshot = await getDocs(collection(db, 'shipments'));
        const shipmentList = shipmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShipments(shipmentList);
      } catch (error) {
        console.error('Error fetching shipments: ', error);
        setError('Error fetching shipments.');
      }
    };

    fetchShipments();
  }, []);

  const updateStatus = async (shipmentId, newStatus) => {
    try {
      const shipmentDoc = doc(db, 'shipments', shipmentId);
      await updateDoc(shipmentDoc, { status: newStatus });
    } catch (error) {
      console.error('Error updating shipment status: ', error);
      setError('Error updating shipment status.');
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.listcontainer}>
        <table className={styles.contentTable}>
          <thead>
            <tr>
              <th>Tracking Code</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Package Size</th>
              <th>Delivery Address</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((shipment) => (
              <tr key={shipment.id}>
                <td>{shipment.trackingCode}</td>
                <td>{shipment.sender}</td>
                <td>{shipment.receiver}</td>
                <td>{shipment.packageSize}</td>
                <td>{shipment.deliveryAddress}</td>
                <td>{shipment.status}</td>
                <td>
                  <button onClick={() => updateStatus(shipment.id, 'On its way to next station')}>On its way to next station</button>
                  <button onClick={() => updateStatus(shipment.id, 'Out for delivery')}>Out for delivery</button>
                  <button onClick={() => updateStatus(shipment.id, 'Delivered')}>Delivered</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
