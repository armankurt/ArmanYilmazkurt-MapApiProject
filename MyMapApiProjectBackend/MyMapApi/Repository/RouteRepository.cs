using System;
using Microsoft.EntityFrameworkCore;
using MyMapApi.Data;
using MyMapApi.Interfaces;

namespace MyMapApi
{
    public class RouteRepository : IRepository<Route>
    {
        private readonly AppDbContext _context;

        public RouteRepository(AppDbContext context)
        {
            _context = context;
        }

        // IRepository<TEntity> yöntemlerini uygulayın
        public IEnumerable<Route> GetAll()
        {
            return _context.Routes.ToList();
        }

        public Route GetById(int id)
        {
            return _context.Routes.Find(id);
        }

        public void Add(Route entity)
        {
            _context.Routes.Add(entity);
            _context.SaveChanges();
        }

        public void Update(Route entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var entity = _context.Routes.Find(id);
            if (entity != null)
            {
                _context.Routes.Remove(entity);
                _context.SaveChanges();
            }
        }
    }

}

