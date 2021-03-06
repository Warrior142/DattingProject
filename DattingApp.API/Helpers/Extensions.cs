using System;
using Microsoft.AspNetCore.Http;

namespace DattingApp.API.Helpers {
    public static class Extensions {
        public static void addApplicationError (this HttpResponse response, string message) {
            response.Headers.Add ("Application-Error", message);
            response.Headers.Add ("Application-Control-Expose-Header", "Application-Error");
            response.Headers.Add ("Application-Control-Allow-Origin", "*");
        }

        public static int CalculateAge (this DateTime theDateTime) {
            var age = DateTime.Today.Year - theDateTime.Year;
            if (theDateTime.AddYears (age) > DateTime.Today)
                age--;
            return age;

        }
    }

}