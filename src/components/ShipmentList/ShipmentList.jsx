import { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from "./index.module.css";

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    const fetchShipments = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, 'shipments'), where('createdBy', '==', auth.currentUser.uid));
        const shipmentSnapshot = await getDocs(q);
        const shipmentList = shipmentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShipments(shipmentList);
      }
    };

    fetchShipments();
  }, []);

  return (
    <div className={styles.container}>
      <div className="maincontainer">
        <div className={styles.innercontainer}>
          <div className={styles.heading}>
            <img src="/left.png" alt="" className={styles.left} />
            Shipment List
            <img src="/right.png" alt="" className={styles.right} />
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentList;
