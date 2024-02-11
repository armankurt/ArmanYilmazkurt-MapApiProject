using System;
using MyMapApi.Interfaces;

namespace MyMapApi.Services
{
    public class RouteService : IRouteService
    {
        private static List<Route> routes = new List<Route>();
        private static Random random = new Random();

        public IEnumerable<Route> GetAll()
        {
            return routes;
        }

        public Route GetById(int id)
        {
            return routes.FirstOrDefault(r => r.Id == id);
        }

        public Route Add(Route route)
        {
            int newId;
            do
            {
                newId = random.Next(1, 1000);
            } while (routes.Any(r => r.Id == newId)); // Yeni ID'nin zaten kullanılmadığından emin olma

            route.Id = newId;
            routes.Add(route);
            return route;
        }

        public void Update(int id, Route route)
        {
            // Belirli bir ID'ye sahip rotayı bul ve güncelle
            var existingRoute = routes.FirstOrDefault(r => r.Id == id);
            if (existingRoute != null)
            {
                existingRoute.StartCoordinateX = route.StartCoordinateX;
                existingRoute.StartCoordinateY = route.StartCoordinateY;
                existingRoute.EndCoordinateX = route.EndCoordinateX;
                existingRoute.EndCoordinateY = route.EndCoordinateY;
            }
        }

        public void Delete(int id)
        {
            // Belirli bir ID'ye sahip rotayı bul ve sil
            var route = routes.FirstOrDefault(r => r.Id == id);
            if (route != null)
            {
                routes.Remove(route);
            }

        }
    }

}

