using System.Text.Json;
using API.Helpers;


namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse httpResponse, PaginationHeader paginationHeader)
        {
            var jsonOption = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            httpResponse.Headers.Add("Pagination", JsonSerializer.Serialize(paginationHeader, jsonOption));
            httpResponse.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}