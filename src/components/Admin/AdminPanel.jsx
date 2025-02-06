import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import styles from './index.module.css';

const AdminPanel = () => {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const shipmentSnapshot = await getDocs(collection(db, 'shipments'));
        const shipmentList = shipmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShipments(shipmentList);
      } catch (error) {
        console.error('Error fetching shipments: ', error);
        setError('Error fetching shipments.');
      }
    };

    fetchShipments();
  }, []);

  const updateStatus = async (shipmentId, newStatus) => {
    alert("Please conform by Clicking 'OK'!");
    try {
      const shipmentDoc = doc(db, 'shipments', shipmentId);
      await updateDoc(shipmentDoc, { status: newStatus });
      setShipments((prevShipments) =>
        prevShipments.map((shipment) =>
          shipment.id === shipmentId
            ? { ...shipment, status: newStatus }
            : shipment
        )
      );
    } catch (error) {
      console.error('Error updating shipment status: ', error);
      setError('Error updating shipment status.');
    }
  };

  const completedShipments = shipments.filter(
    (shipment) => shipment.status === 'Delivered'
  );
  const ongoingShipments = shipments.filter(
    (shipment) => shipment.status !== 'Delivered'
  );

  return (
    <div>
      <div className="maincontainer">
        {error && <p className={styles.error}>{error}</p>}

        {/* Tabs for switching views */}
        <div className={styles.btns}>
          <div className={styles.innerbtns}>
            <button
              style={{ backgroundColor: tab == 0 ? 'white' : '#ebebeb' }}
              onClick={() => setTab(0)}
            >
              Ongoing Shipments
            </button>
            <button
              style={{ backgroundColor: tab == 1 ? 'white' : '#ebebeb' }}
              onClick={() => setTab(1)}
            >
              Completed Shipments
            </button>
          </div>
        </div>

        <div className={styles.listcontainer}>
          <div className={styles.tableContainer}>
            <table className={styles.contentTable}>
              <thead>
                <tr>
                  <th>Tracking Code</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Package Size</th>
                  <th>Delivery Address</th>
                  <th>Status</th>
                  {tab === 0 && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {tab === 0
                  ? ongoingShipments.map((shipment) => (
                    <tr key={shipment.id}>
                      <td>{shipment.trackingCode}</td>
                      <td>{shipment.sender}</td>
                      <td>{shipment.receiver}</td>
                      <td>{shipment.packageSize}</td>
                      <td>{shipment.deliveryAddress}</td>
                      <td>{shipment.status}</td>
                      <td>
                        <select
                          onChange={(e) =>
                            updateStatus(shipment.id, e.target.value)
                          }
                          defaultValue={shipment.status}
                        >
                          <option value="On its way to next station">
                            On its way to next station
                          </option>
                          <option value="Out for delivery">Out for delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))
                  : completedShipments.map((shipment) => (
                    <tr key={shipment.id}>
                      <td>{shipment.trackingCode}</td>
                      <td>{shipment.sender}</td>
                      <td>{shipment.receiver}</td>
                      <td>{shipment.packageSize}</td>
                      <td>{shipment.deliveryAddress}</td>
                      <td>{shipment.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
