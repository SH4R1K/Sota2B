using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Sota2B.DM.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public int IdUser { get; set; }
        public int Price { get; set; }
        public DateTime PurchaseDate { get; set; }
        [ForeignKey("IdProduct")]
        [JsonIgnore]
        public Product? Product { get; set; }
        [ForeignKey("IdUser")]
        [JsonIgnore]
        public User? User { get; set; }
    }
}
