using Sota2B.API.Dto;
using Sota2B.DM.Models;

namespace Sota2B.API.Converters
{
    public class UserToDetailsDtoConverter : IConverter<User, UserDetailsDto>
    {
        private readonly IConverter<Purchase, PurchaseDto> _purchaseConverter;
        private readonly IConverter<Achievement, AchievementDto> _achievmentConverter;

        public UserToDetailsDtoConverter(IConverter<Achievement, AchievementDto> achievmentConverter, IConverter<Purchase, PurchaseDto> purchaseConverter)
        {
            _achievmentConverter = achievmentConverter;
            _purchaseConverter = purchaseConverter;
        }

        public UserDetailsDto Convert(User source)
        {
            return new UserDetailsDto { 
                Id =  source.Id, 
                Name = source.Name, 
                Points = source.UserWasOnEvent
                    .Where(e => e.Event.EndDate < DateTime.Now)
                    .Sum(u => u.Points) - source.Purchases.Sum(u => u.Price),
                Purchases = source.Purchases.Select(_purchaseConverter.Convert).ToList(),
                Achievements = source.UserHasAchievments.Select(u => _achievmentConverter.Convert(u.Achievement)).ToList(),
                Events = source.UserWasOnEvent.Select(u => u.Event).ToList(),
            };
        }
    }
}
