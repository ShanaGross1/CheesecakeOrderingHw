using CheesecakeOrdersHw.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CheesecakeOrdersHw.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private string _connectionString;

        public OrdersController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getorders")]
        public List<Order> GetOrders()
        {
            var repo = new OrderRepo(_connectionString);
            return repo.GetOrders();
        }

        [HttpPost("add")]
        public void Add(Order o)
        {
            var repo = new OrderRepo(_connectionString);
            repo.AddOrder(o);
        }

        [Route("getbyid")]
        public Order GetById(int id)
        {
            var repo = new OrderRepo(_connectionString);
            return repo.GetById(id);
        }

    }
}
