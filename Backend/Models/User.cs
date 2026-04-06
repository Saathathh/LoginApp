using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Backend.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("name")]
    [Required, StringLength(100, MinimumLength = 2)]
    public required string Name { get; set; }

    [BsonElement("email")]
    [Required, EmailAddress]
    public required string Email { get; set; }

    [BsonElement("passwordHash")]
    [Required]
    public required string PasswordHash { get; set; }

    [BsonElement("role")]
    [Required]
    public string Role { get; set; } = "User";

    [BsonElement("createdAt")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
