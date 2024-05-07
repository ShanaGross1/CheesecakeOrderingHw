import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './home'
import Order from './order'
import ViewOrders from './view-orders';
import OrderDetails from './order-details';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/order' element={<Order />} />
                <Route path='/view-orders' element={<ViewOrders />} />
                <Route path='/order-details/:id' element={<OrderDetails />} />
            </Routes>
        </Layout>
    );
}

export default App;