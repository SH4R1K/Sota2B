namespace Sota2B.API.Converters
{
    public interface IConverter<TSource, TDestination>
    {
        TDestination Convert(TSource source);
    }
}
