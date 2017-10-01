// Leo Added
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using LeoPortal2.Models;
//using Microsoft.Extensions.Configuration;
//using Microsoft.Data.Entity;

namespace LeoPortal2.Models
{
    public class WorldContext : IdentityDbContext<ApplicationUser>
    {
        //private IConfigurationRoot _config;

        //public WorldContext(DbContextOptions<WorldContext> options, IConfigurationRoot config) : base(options)
        public WorldContext(DbContextOptions<WorldContext> options) : base(options)
        {
            //_config = config;

            Database.EnsureCreated();
        }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Stop> Stops { get; set; }
        public DbSet<Favlink> Favlinks { get; set; }
        public DbSet<Link> Links { get; set; }
        public DbSet<Cashflow> Cashflows { get; set; }
        public DbSet<Cashitem> Cashitems { get; set; }

        //RC1 Legacy
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    var connString = _config["ConnectionStrings:WorldContextConnection"];
        //    optionsBuilder.UseSqlServer(connString);
        //    base.OnConfiguring(optionsBuilder);
        //}

        //protected override void OnModelCreating(ModelBuilder builder)
        //{
        //    base.OnModelCreating(builder);
        //    // Customize the ASP.NET Identity model and override the defaults if needed.
        //    // For example, you can rename the ASP.NET Identity table names and more.
        //    // Add your customizations after calling base.OnModelCreating(builder);
        //}

    }
}
