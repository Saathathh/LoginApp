namespace Backend.DTOs;

public class SignupRequest
{
    public required string Name { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
}

public class LoginRequest
{
    public required string Email { get; set; }
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
