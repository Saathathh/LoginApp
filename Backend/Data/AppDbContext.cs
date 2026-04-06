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

        var indexModels = new[]
        {
            // Unique index on email — prevents duplicate accounts, speeds up login lookups
            new CreateIndexModel<User>(
                Builders<User>.IndexKeys.Ascending("email"),
                new CreateIndexOptions { Unique = true }),
            // Index on role — speeds up role-based queries (e.g. list all admins)
            new CreateIndexModel<User>(
                Builders<User>.IndexKeys.Ascending("role")),
        };
        _users.Indexes.CreateMany(indexModels);
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
