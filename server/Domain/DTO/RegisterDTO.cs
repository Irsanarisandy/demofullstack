using System.ComponentModel.DataAnnotations;

namespace Domain.DTO
{
    public class RegisterDTO
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(14, MinimumLength=4)]
        public string Password { get; set; }
    }
}
