using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sota2B.DM.Models
{
    public class UserWasOnEvent
    {
        public int IdEvent { get; set; }
        public int IdUser { get; set; }
        public int Points { get; set; }
        [ForeignKey("IdEvent")]
        [JsonIgnore]
        public Event? Event { get; set; }
        [ForeignKey("IdUser")]
        [JsonIgnore]
        public User? User { get; set; }
    }
}
