using Sota2B.DAL.Data;
using Sota2B.DM.Models;

namespace Sota2B.API.Services.UserService
{
    public class UserService
    {
        private readonly Sota2BContext _context;
        public UserService(Sota2BContext context = null)
        {
            _context = context;
        }

        public async Task Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user != null)
            {
                _context.Users.Remove(user);
            }
        }

        public Task<User> Get(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<User>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<User> Post(User newObject)
        {
            throw new NotImplementedException();
        }

        public Task<User> Put(int id, User newObject)
        {
            throw new NotImplementedException();
        }
    }
}
