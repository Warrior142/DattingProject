using Microsoft.AspNetCore.Http;

namespace DattingApp.API.Helpers {
    public static class Extensions {
        public static void addApplicationError (this HttpResponse response, string message) {
            response.Headers.Add ("Application-Error", message);
            response.Headers.Add ("Application-Control-Expose-Header", "Application-Error");
            response.Headers.Add ("Application-Control-Allow-Origin", "*");
        }
    }
}