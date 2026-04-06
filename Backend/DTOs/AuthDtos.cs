using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class SignupRequest
{
    [Required, StringLength(100, MinimumLength = 2)]
    public required string Name { get; set; }

    [Required, EmailAddress]
    public required string Email { get; set; }

    [Required, MinLength(6)]
    public required string Password { get; set; }
}

public class LoginRequest
{
    [Required, EmailAddress]
    public required string Email { get; set; }

    [Required]
    public required string Password { get; set; }
}

public class LoginResponse
{
    public required string Message { get; set; }
    public required string Token { get; set; }
    public required UserInfo User { get; set; }
}

public class UserInfo
{
    public required string Id { get; set; }
    public required string Name { get; set; }
    public required string Email { get; set; }
}
