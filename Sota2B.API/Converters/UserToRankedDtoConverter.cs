using Sota2B.API.Dto;
using Sota2B.DM.Models;

namespace Sota2B.API.Converters
{
    public class UserToRankedDtoConverter : IConverter<User, UserRankedDto>
    {
        public UserRankedDto Convert(User source)
        {
            return new UserRankedDto { Id =  source.Id, Name = source.Name, Points = source.UserWasOnEvent.Where(e => e.Event.EndDate < DateTime.Now).Sum(u => u.Points)};
        }
    }
}
