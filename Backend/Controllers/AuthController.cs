using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Backend.Data;
using Backend.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly MongoDbService _db;
    private readonly IConfiguration _config;

    public AuthController(MongoDbService db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup(SignupRequest request)
    {
        var existing = await _db.GetUserByEmailAsync(request.Email);
        if (existing != null)
            return BadRequest(new { message = "Email already exists" });

        var user = new Models.User
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        await _db.CreateUserAsync(user);

        return Ok(new { message = "User registered successfully", user = new { user.Id, user.Name, user.Email } });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _db.GetUserByEmailAsync(request.Email);

        if (user == null || string.IsNullOrWhiteSpace(user.PasswordHash) || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Unauthorized(new { message = "Invalid email or password" });

        var token = GenerateJwtToken(user);

        return Ok(new LoginResponse
        {
            Message = "Login successful",
            Token = token,
            User = new UserInfo { Id = user.Id!, Name = user.Name, Email = user.Email }
        });
    }

    private string GenerateJwtToken(Models.User user)
    {
        var key = _config["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured.");
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id!),
            new Claim(JwtRegisteredClaimNames.Name, user.Name),
            new Claim("role", "User"),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [Authorize]
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _db.GetAllUsersAsync();
        var result = users.Select(u => new { u.Id, u.Name, u.Email });
        return Ok(new { totalCount = users.Count, users = result });
    }
}
