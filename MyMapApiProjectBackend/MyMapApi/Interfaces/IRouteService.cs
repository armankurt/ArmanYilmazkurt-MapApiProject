using System.Collections.Generic;

namespace MyMapApi.Interfaces
{
    public interface IRouteService
    {
        IEnumerable<Route> GetAll();
        Route GetById(int id);
        Route Add(Route route);
        void Update(int id, Route route);
        void Delete(int id);
    }
}


