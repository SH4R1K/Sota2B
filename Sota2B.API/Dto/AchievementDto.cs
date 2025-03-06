using Sota2B.DM.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sota2B.API.Dto
{
    public class AchievementDto
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
