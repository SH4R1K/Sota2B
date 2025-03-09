using Sota2B.DM.Models;

namespace Sota2B.API.Dto
{
    public class EventDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Reward { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public AchievementDto? Achievement { get; set; }
        public List<User> UserWasOnEvent { get; set; } = new List<User>();
    }
}
