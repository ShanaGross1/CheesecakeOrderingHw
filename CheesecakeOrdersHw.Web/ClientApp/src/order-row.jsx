import { Link } from 'react-router-dom'

const OrderRow = ({ order }) => {
    const { name, email, baseFlavor, toppings, specialRequests, quantity, deliveryDate, total, id } = order;
    return <tr>
        <td>
            <Link to={`/order-details/${id}`}>
                {name} - {email}
            </Link>
        </td>
        <td>{baseFlavor}</td>
        <td>{toppings}</td>
        <td>{specialRequests}</td>
        <td>{quantity} </td>
        <td>{deliveryDate}</td>
        <td>{total}</td>
    </tr>
}

export default OrderRow;