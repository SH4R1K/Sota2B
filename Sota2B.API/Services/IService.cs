namespace Sota2B.API.Services
{
    public interface IService<T>
    {
        public T GetAll();
        public T Get(int id);
        public T Put(int id, T newObject);
        public T Post(T newObject);
        public void Delete(int id);
    }
}
