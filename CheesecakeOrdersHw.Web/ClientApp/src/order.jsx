import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from "dayjs";

const toppingsList = ['Chocolate Chips', 'Caramel Drizzle', 'Whipped Cream', 'Pecans', 'Almonds', 'Toasted Coconut', 'Graham Cracker Crumble', 'Cookie Dough', 'Mint Chocolate Chips', 'Caramelized Bananas',
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

    const { name, email, baseFlavor, toppings, specialRequests, quantity, deliveryDate } = order;

    const orderTotal = (quantity * 49.99) + (toppings.length * 3.95 * quantity);

    const selectedToppingsAsString = toppings.map(t => ' ' + t).toString();

    const isValidOrder = (name && email && deliveryDate);

    const navigate = useNavigate();

    const onInputChange = e => {
        let copy = { ...order };
        copy[e.target.name] = e.target.value;
        setOrder(copy);
    }

    const onSubmitClick = async () => {
        await axios.post('/api/orders/add', { ...order, total: orderTotal, toppings: selectedToppingsAsString })
        navigate('/view-orders')
    }

    const onToppingsCheckBoxClick = (selected) => {
        let selectedToppings = toppings.includes(selected) ? [...toppings.filter(t => t !== selected)] : [...toppings, selected];
        setOrder({ ...order, toppings: selectedToppings })
    }

    return (<>
        <div className="container" style={{ marginTop: 80 }} >
            <h1 className="text-center my-4">Cheesecake Factory Order Form</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="row">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={onInputChange} value={name} name='name' />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" onChange={onInputChange} value={email} name='email' />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Cheesecake Base Flavor</label>
                        <select className='form-select' onChange={onInputChange} value={baseFlavor} name='baseFlavor'>
                            <option>Choose...</option>
                            <option>Classic</option>
                            <option>Chocolate</option>
                            <option>Red Velvet</option>
                            <option>Bownie</option>
                        </select>
                    </div>

                    <label className="form-label">Toppings (each topping adds an additional $3.95)</label>
                    {toppingsList.map((t, idx) => {
                        return (
                            <div key={idx} className="form-check" >
                                <input className="form-check-input" type="checkbox" onChange={() => onToppingsCheckBoxClick(t)} />
                                <label className="form-check-label">{t}</label>
                            </div>
                        )
                    })}
                    <div className="mb-3">
                        <label className="form-label">Special Requests</label>
                        <textarea className="form-control" rows="3" onChange={onInputChange} value={specialRequests} name='specialRequests'></textarea>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Quantity</label>
                        <input type="number" className="form-control" min="1" onChange={onInputChange} value={quantity} name='quantity' />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Delivery Date</label>
                        <input type="date" className="form-control" onChange={onInputChange} value={deliveryDate} name='deliveryDate' />
                    </div>

                    <button className='btn btn-primary' onClick={onSubmitClick} disabled={!isValidOrder}>Submit Order</button>
                </div>
            </div>
        </div >

        <div className="col-md-6 position-sticky" >
            <h2 className="mb-4">Live Preview</h2>
            <div className="card" >
                <button>picture</button>
                <div className="card-body">
                    <h5 className="card-title">Your Custom Cheesecake</h5>
                    <p className="card-text"> "Base:" {baseFlavor}</p>
                    <p className="card-text">Toppings: {selectedToppingsAsString}</p>
                    <p className="card-text">Special Requests: {specialRequests} </p>
                    <p className="card-text">Quantity: {quantity} </p>
                    <p className="card-text">Delivery Date: {dayjs(deliveryDate).format("MM/DD/YYYY")} </p>
                    <p className="card-text fw-bold">Total: {orderTotal.toFixed(2)}</p>
                </div>
            </div>
        </div>
    </>
    )
}
export default Order;