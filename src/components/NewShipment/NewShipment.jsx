import { useState } from 'react';
import { db, auth } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import styles from "./index.module.css";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const generateTrackingCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const NewShipment = () => {
  const [sender, setSender] = useState('');
  const [receiver, setReceiver] = useState('');
  const [packageSize, setPackageSize] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const navigate = useNavigate();

  const handleCreateShipment = async () => {
    try {
      const trackingCode = generateTrackingCode();
      await addDoc(collection(db, 'shipments'), {
        sender,
        receiver,
        packageSize,
        deliveryAddress,
        status: 'Order received',
        createdBy: auth.currentUser.uid,
        trackingCode
      });
      toast.success('Shipment created successfully!');
      navigate("/");
    } catch (error) {
      console.error("Error creating shipment: ", error);
      toast.error("Error creating shipment");
    }
  };

  return (
    <div className={styles.container}>
      <div className="maincontainer">
        <div className={styles.innercontainer}>
          <div className={styles.heading}>
            <img src="/left.png" alt="" className={styles.left} />
            Create New Shipment
            <img src="/right.png" alt="" className={styles.right} />
          </div>
          <div className={styles.inputcontainer}>
            <div className={styles.first}>
              <input placeholder="Sender" value={sender} onChange={(e) => setSender(e.target.value)} />
              <input placeholder="Receiver" value={receiver} onChange={(e) => setReceiver(e.target.value)} />
              <input placeholder="Package Size" value={packageSize} onChange={(e) => setPackageSize(e.target.value)} />
            </div>
            <input placeholder="Delivery Address" value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} />
          </div>
          <button onClick={handleCreateShipment}>Create Shipment</button>
        </div>
      </div>
    </div>
  );
};

export default NewShipment;
