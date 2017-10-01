// Leo Added
using LeoPortal2.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeoPortal2.Models
{
    public class AppContextSeedData
    {
        private ApplicationUser newUser;
        private IConfiguration _config;
        private ApplicationDbContext _context;
        private UserManager<ApplicationUser> _userManager;

        public AppContextSeedData(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IConfiguration config)
        //public WorldContextSeedData(WorldContext context, IConfigurationRoot config)
        {
            _context = context;
            _userManager = userManager;
            _config = config;
        }
        public async Task EnsureSeedDataAsync()
        //public void EnsureSeedDataAsync()
        {
            if (await _userManager.FindByEmailAsync("leolin@leolin.studio") == null)
            {
                // Add the User.
                newUser = new ApplicationUser()
                {
                    UserName = "leolin",
                    //NormalizedUserName = "leolin@leolin.studio",
                    Email = "leolin@leolin.studio"
                };

                await _userManager.CreateAsync(newUser, _config["AppSettings:DefaultUserKey"]);
            }
            //_context.SaveChanges();
        }
    }
}
