using Microsoft.EntityFrameworkCore;
using Sota2B.DM.Models;

namespace Sota2B.DAL.Data
{
    public class Sota2BContext : DbContext
    {
        public Sota2BContext()
        {

        }
        public Sota2BContext(DbContextOptions<Sota2BContext> options) : base(options)
        {
        }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Event> Events { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Purchase> Purchases { get; set; }
        public virtual DbSet<Achievement> Achievements { get; set; }
        public virtual DbSet<UserHasAchievement> UserHasAchievements { get; set; }
        public virtual DbSet<UserWasOnEvent> UserWasOnEvents { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserHasAchievement>(entity =>
            {
                entity.HasKey(e => new { e.IdUser, e.IdAchievment });
            });
            modelBuilder.Entity<UserWasOnEvent>(entity =>
            {
                entity.HasKey(e => new { e.IdUser, e.IdEvent });
            });
        }
    }
}
