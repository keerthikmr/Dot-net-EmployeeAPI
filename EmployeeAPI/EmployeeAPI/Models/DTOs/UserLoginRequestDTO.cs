namespace EmployeeAPI.Models.DTOs;

using System.ComponentModel.DataAnnotations;

public class UserLoginRequestDTO
{
    [Required]
    public string Email { get; set; } = string.Empty;
    
    [Required]
    public string Password { get; set; } = string.Empty;
}