using Sota2B.API.Dto;
using Sota2B.DM.Models;

namespace Sota2B.API.Converters
{
    public class EventToDtoConverter : IConverter<Event, EventDetailsDto>
    {
        private readonly IConverter<User, UserDto> _userConverterDto;
        private readonly IConverter<Achievement, AchievementDto> _achievmentConverter;
        public EventToDtoConverter(IConverter<User, UserDto> userConverterDto, IConverter<Achievement, AchievementDto> achievmentConverter)
        {
            _userConverterDto = userConverterDto;
            _achievmentConverter = achievmentConverter;
        }
        public EventDetailsDto Convert(Event source)
        {
            var achievementDto = source.Achievement != null
                ? _achievmentConverter.Convert(source.Achievement)
                : null;
            return new EventDetailsDto
            {
                Id = source.Id,
                Name = source.Name,
                Description = source.Description,
                Achievement = achievementDto,
                StartDate = source.StartDate,
                EndDate = source.EndDate,
                Reward = source.Reward,
                UserWasOnEvent = source.UserWasOnEvent.Select(u => u.User).ToList()
            };
        }
    }
}
