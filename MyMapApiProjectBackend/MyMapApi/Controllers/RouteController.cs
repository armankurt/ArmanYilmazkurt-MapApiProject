using Microsoft.AspNetCore.Mvc;
using MyMapApi.Data; 
using MyMapApi;      
using Microsoft.EntityFrameworkCore;

namespace MyMapApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RouteController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/route
        [HttpGet]
        public ActionResult<IEnumerable<Route>> Get()
        {
            var routes = _context.Routes.ToList();
            return Ok(routes);
        }

        // GET: api/route/{id}
        [HttpGet("{id}")]
        public ActionResult<Route> Get(int id)
        {
            var route = _context.Routes.Find(id);
            if (route == null)
            {
                return NotFound();
            }
            return Ok(route);
        }

        // POST: api/route
        [HttpPost]
        public ActionResult<Route> Post([FromBody] Route route)
        {
            _context.Routes.Add(route);
            _context.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = route.Id }, route);
        }

        // PUT: api/route/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Route route)
        {
            if (id != route.Id)
            {
                return BadRequest();
            }

            _context.Entry(route).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/route/{id}
        [HttpDelete("{id}")]
        public ActionResult<Route> Delete(int id)
        {
            var route = _context.Routes.Find(id);
            if (route == null)
            {
                return NotFound();
            }

            _context.Routes.Remove(route);
            _context.SaveChanges();
            return route;
        }
    }
}
