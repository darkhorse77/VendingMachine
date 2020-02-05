using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VendingMachine.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Drink> Drinks { get; set; }
        public DbSet<Coin> Coins { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated(); 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Coin>().HasData(
                new Coin[]
                {
                    new Coin { Id = 1, Value = 1, Count = 100, IsActive = true },
                    new Coin { Id = 2, Value = 2, Count = 50, IsActive = false },
                    new Coin { Id = 3, Value = 5, Count = 20, IsActive = true },
                    new Coin { Id = 4, Value = 10, Count = 10, IsActive = true },
                });
            modelBuilder.Entity<Drink>().HasData(
                new Drink[]
                {
                    new Drink { Id = 1, Count = 3, Name = "Latte", Price = 35, Image = "src/app/res/latte.png" },
                    new Drink { Id = 2, Count = 5, Name = "Espresso", Price = 20, Image = "src/app/res/espresso.png" },
                    new Drink { Id = 3, Count = 1, Name = "Capuchino", Price = 25, Image = "src/app/res/latte.png" }
                });
        }
    }
}
