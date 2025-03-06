using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sota2B.DM.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name{ get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        [JsonIgnore]
        public List<Purchase> Purchases { get; set; } = new List<Purchase>();
    }
}
