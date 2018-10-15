using System.ComponentModel.DataAnnotations;

namespace DattingApp.API.Dtos {
    public class UserForRegistorDto {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="you must specify a password between 4 and 9")]
        public string Password { get; set; }
    }
}