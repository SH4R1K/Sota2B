using Sota2B.API.Dto;
using Sota2B.DM.Models;

namespace Sota2B.API.Converters
{
    public class AchievementToDtoConverter : IConverter<Achievement, AchievementDto>
    {
        public AchievementDto Convert(Achievement source)
        {
            return new AchievementDto { Id = source.Id, Name = source.Name, Description = source.Description, EventName = source.Event.Name };
        }
    }
}
