using Sota2B.DM.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Sota2B.API.Dto
{
    public class PurchaseDto
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public string ProductName { get; set; }
        public int Price { get; set; }
        public DateTime PurchaseDate { get; set; }
    }
}
