import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";

const toppings = ['Chocolate Chips', 'Caramel Drizzle', 'Whipped Cream', 'Pecans', 'Almonds', 'Toasted Coconut', 'Graham Cracker Crumble', 'Cookie Dough', 'Mint Chocolate Chips', 'Caramelized Bananas',
    'Rainbow Sprinkles', 'Powdered Sugar', 'White Chocolate Shavings', 'Peanut Butter Drizzlwe', 'Dark Chocolate Drizzle'];

const Order = () => {

    const [order, setOrder] = useState({
        name: '',
        email: '',
        baseFlavor: '',
        specialRequests: '',
        quantity: 1,
        deliveryDate: '',
        toppings: []
    });

    const navigate = useNavigate();

    const orderTotal = (order.quantity * 49.99) + (order.toppings.length * 3.95 * order.quantity);

    const isValidOrder = (order.name && order.email && order.deliveryDate);

    const onInputChange = e => {
        let copy = { ...order };
        copy[e.target.name] = e.target.value;
        setOrder(copy);
    }

    const onSubmitClick = async () => {
        await axios.post('/api/orders/add', { ...order, total: orderTotal, toppings: toppings.map(t => t + ", ").toString() })
        navigate('/view-orders')
    }

    const onToppingsCheckBoxClick = (currentTopping) => {
        let toppingsList = order.toppings.includes(currentTopping) ? [...order.toppings.filter(t => t !== currentTopping)] : [...order.toppings, currentTopping];
        setOrder({ ...order, toppings: toppingsList })
    }

    return (<>
        <div className="container" style={{ marginTop: 80 }} >
            <h1 className="text-center my-4">Cheesecake Factory Order Form</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={onInputChange} value={order.name} name='name' />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" onChange={onInputChange} value={order.email} name='email' />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cheesecake Base Flavor</label>
                        <select className='form-select' onChange={onInputChange} value={order.baseFlavor} name='baseFlavor'>
                            <option>Choose...</option>
                            <option>Classic</option>
                            <option>Chocolate</option>
                            <option>Red Velvet</option>
                            <option>Bownie</option>
                        </select>
                    </div>

                    <label className="form-label">Toppings (each topping adds an additional $3.95)</label>
                    {toppings.map((t, idx) => {
                        return (
                            <div key={idx} className="form-check" >
                                <input className="form-check-input" type="checkbox" onChange={() => onToppingsCheckBoxClick(t)} />
                                <label className="form-check-label">{t}</label>
                            </div>
                        )
                    })}
                    <div className="mb-3">
                        <label className="form-label">Special Requests</label>
                        <textarea className="form-control" rows="3" onChange={onInputChange} value={order.specialRequests} name='specialRequests'></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" min="1" value="1" onChange={onInputChange} value={order.quantity} name='quantity' />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Delivery Date</label>
                        <input type="date" className="form-control" onChange={onInputChange} value={order.deliveryDate} name='deliveryDate' />
                    </div>

                    <button className='btn btn-primary' onClick={onSubmitClick} disabled={isValidOrder ? false : true}>Submit Order</button>
                </div>
            </div>
        </div >
        <div className="col-md-6 position-sticky" >
            <h2 className="mb-4">Live Preview</h2>
            <div className="card" >
                <button>picture</button>
                <div className="card-body">
                    <h5 className="card-title">Your Custom Cheesecake</h5>
                    <p className="card-text"> "Base:" {order.baseFlavor}</p>
                    <p className="card-text">Toppings: {order.toppings.map(t => t + ", ").toString()}</p>
                    <p className="card-text">Special Requests: {order.specialRequests} </p>
                    <p className="card-text">Quantity: {order.quantity} </p>
                    <p className="card-text">Delivery Date: {dayjs(order.deliveryDate).format("MM/DD/YYYY")} </p>
                    <p className="card-text fw-bold">Total: {orderTotal.toFixed(2)}</p>
                </div>
            </div>
        </div>
    </>
    )
}
export default Order;