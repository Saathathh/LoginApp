using Backend.Models;
using MongoDB.Driver;

namespace Backend.Data;

public class MongoDbService
{
    private readonly IMongoCollection<User> _users;

    public MongoDbService(IConfiguration config)
    {
        var client = new MongoClient(config["MongoDB:ConnectionString"]);
        var database = client.GetDatabase(config["MongoDB:DatabaseName"]);
        _users = database.GetCollection<User>("Users");

        // Create unique index on Email
        var indexKeys = Builders<User>.IndexKeys.Ascending(u => u.Email);
        var indexOptions = new CreateIndexOptions { Unique = true };
        _users.Indexes.CreateOne(new CreateIndexModel<User>(indexKeys, indexOptions));
    }

    public async Task<User?> GetUserByEmailAsync(string email) =>
        await _users.Find(u => u.Email == email).FirstOrDefaultAsync();

    public async Task CreateUserAsync(User user) =>
        await _users.InsertOneAsync(user);

    public async Task<List<User>> GetAllUsersAsync() =>
        await _users.Find(_ => true).ToListAsync();

    public async Task<long> GetUserCountAsync() =>
        await _users.CountDocumentsAsync(_ => true);
}
