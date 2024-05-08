using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CheesecakeOrdersHw.Data
{
    public class OrderRepo
    {
        private readonly string _connectionString;
        public OrderRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Order> GetOrders()
        {
            using var context = new OrdersDataContext(_connectionString);
            return context.Orders.ToList();
        }

        public void AddOrder (Order order)
        {
            using var context = new OrdersDataContext(_connectionString);
            context.Add(order);
            context.SaveChanges();
        }

        public Order GetById (int id)
        {
            using var context = new OrdersDataContext(_connectionString);
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }
    }
}
