using System;
namespace MyMapApi.Interfaces
{
    public interface IRepository<TEntity>
    {
        IEnumerable<TEntity> GetAll();
        TEntity GetById(int id);
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(int id);
    }

}

