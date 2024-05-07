import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderRow from './order-row';

const ViewOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const { data } = await axios.get('/api/orders/getorders');
            setOrders(data);
        }
        getOrders();
    }, [])

    return (
        <table className="table table-hover table-stripe">
            <thead>
                <tr>
                    <th>Name/Email</th>
                    <th>Base Flavor</th>
                    <th>Toppings</th>
                    <th>Special Requests</th>
                    <th>Quantity</th>
                    <th>Delivery Date</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(o => <OrderRow order={o} key={o.id} />)}
            </tbody>
        </table>
    )
}

export default ViewOrders;