using Sota2B.API.Dto;
using Sota2B.DM.Models;

namespace Sota2B.API.Converters
{
    public class PurchaseToDtoConverter : IConverter<Purchase, PurchaseDto>
    {
        public PurchaseDto Convert(Purchase source)
        {
            return new PurchaseDto { Id = source.Id, IdProduct = source.IdProduct, Price = source.Price, ProductName = source.Product.Name, PurchaseDate = source.PurchaseDate };
        }
    }
}
