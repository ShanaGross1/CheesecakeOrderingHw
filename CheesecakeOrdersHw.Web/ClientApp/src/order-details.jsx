import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderDetails = () => {

    const { id } = useParams();
    const [order, setOrder] = useState({});
    const { name, email, baseFlavor, toppings, specialRequests, quantity, deliveryDate, total } = order;

    useEffect(() => {
        const getOrderbyId = async () => {
            const { data } = await axios.get(`/api/orders/getbyid?id=${id}`);
            setOrder(data)
        }
        getOrderbyId();
    }, [])

    return (
        <div className="card text-center shadow p-3 mb-5 bg-body rounded" >
            <div className='card-body'>
                <h3 className="card-title fw-bold">{name}</h3>
                <p className='card-text fs-5'>{email}</p>
                <p className='card-text fs-5'>{baseFlavor}</p>
                <p className='card-text fs-5'>{toppings}</p>
                <p className='card-text fs-5'>{specialRequests}</p>
                <p className='card-text fs-5'>{quantity}</p>
                <p className='card-text fs-5'>{deliveryDate}</p>
                <p className='card-text fs-5'>{total}</p>
                <Link to='/view-orders'>
                    <button className='btn btn-primary'>Back to Orders</button>
                </Link>
            </div>
        </div>)
}

export default OrderDetails;