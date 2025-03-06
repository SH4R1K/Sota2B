using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sota2B.DM.Models
{
    public class Achievement
    {
        public int Id { get; set; }
        public int IdEvent { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        [JsonIgnore]
        [ForeignKey("IdEvent")]
        public Event? Event { get; set; }
        [JsonIgnore]
        public List<UserHasAchievement> UserHasAchievment { get; set; } = new List<UserHasAchievement>();
    }
}
