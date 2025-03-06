using Sota2B.API.Dto;
using Sota2B.DM.Models;

namespace Sota2B.API.Converters
{
    public class UserToDtoConverter : IConverter<User, UserDto>
    {
        public UserDto Convert(User source)
        {
            return new UserDto { Id =  source.Id, Name = source.Name, Points = source.UserWasOnEvent.Where(e => e.Event.EndDate < DateTime.Now).Sum(u => u.Points) - source.Purchases.Sum(u => u.Price) };
        }
    }
}
