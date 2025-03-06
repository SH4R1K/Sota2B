using Sota2B.DM.Models;

namespace Sota2B.API.Dto
{
    public class UserDetailsDto
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Points { get; set; }
        public List<AchievementDto> Achievements { get; set; }
        public List<PurchaseDto> Purchases { get; set; }
        public List<Event> Events { get; set; }
    }
}
