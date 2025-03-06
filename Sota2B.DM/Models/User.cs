using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sota2B.DM.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        [JsonIgnore]
        public List<Purchase> Purchases { get; set; } = new List<Purchase>();
        [JsonIgnore]
        public List<UserHasAchievement> UserHasAchievments { get; set; } = new List<UserHasAchievement>();
        [JsonIgnore]
        public List<UserWasOnEvent> UserWasOnEvent { get; set; } = new List<UserWasOnEvent>();
    }
}
