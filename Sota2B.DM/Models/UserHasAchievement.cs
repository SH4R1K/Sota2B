using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sota2B.DM.Models
{
    public class UserHasAchievement
    {
        public int IdAchievment { get; set; }
        public int IdUser { get; set; }
        [ForeignKey("IdAchievment")]
        [JsonIgnore]
        public Achievement? Achievement { get; set; }
        [ForeignKey("IdUser")]
        [JsonIgnore]
        public User? User { get; set; }
    }
}
