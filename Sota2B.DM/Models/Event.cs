using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sota2B.DM.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Reward { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        [JsonIgnore]
        public Achievement? Achievement { get; set; }
        [JsonIgnore]
        public List<UserWasOnEvent> UserWasOnEvent { get; set; } = new List<UserWasOnEvent>();
    }
}
