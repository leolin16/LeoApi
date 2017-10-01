using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using LeoPortal2.Data;
using LeoPortal2.Models;
using LeoPortal2.Services;

// just for writeAsync method
using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.Mvc.Formatters;
using AutoMapper;
using LeoPortal2.Models.PageViewModels;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using LeoPortal2.Options;
using LeoPortal2.Models.Interfaces;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace LeoPortal2
{
    public class Startup
    {
    // Leo Start
        //public static IConfigurationRoot Configuration; //adding static to make it callable to other files, found by Leo
        private IHostingEnvironment _env;
        private IConfigurationRoot _config;
        private void ConfigureSettings(IServiceCollection services)
        {
            var configBuilder = new ConfigurationBuilder()
                .SetBasePath(_env.ContentRootPath)
                .AddJsonFile("alertThresholds.json");
            var configFishTank = configBuilder.Build();

            services.Configure<ThresholdOptions>(configFishTank);//need Microsoft.Extensions.Options.ConfigurationExtensions to make it pass the rule check
            services.AddOptions();
        }
    // Leo End
    // Leo Start Edit: add IHostingEnvironment to StartUp
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }
    // Leo End
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
        // Leo Start Edit
            // services.AddDbContext<ApplicationDbContext>(options =>
            //     options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

            services.AddDbContext<ApplicationDbContext>(
                options =>
                options.UseSqlServer(Configuration.GetConnectionString("SqlServerIdentityConnection"))
                );

            services.AddDbContext<WorldContext>(
                //method changed to be implemented to WorldContext.cs (not yet determined)
                options =>
                options.UseSqlServer(Configuration.GetConnectionString("SqlServerDataConnection"))
                );


            services.AddIdentity<ApplicationUser, IdentityRole>(config =>
            {
                config.User.RequireUniqueEmail = true;
                config.Password.RequiredLength = 8;
                config.Password.RequireDigit = true;
                config.Password.RequireUppercase = true;
                config.Password.RequireLowercase = true;
                config.Password.RequireNonAlphanumeric = true;
                // config.Cookies.ApplicationCookie.LoginPath = "/Account/Login";
                // config.Cookies.ApplicationCookie.LogoutPath = "/Account/LogOff";
                //config.Cookies.ApplicationCookie.LoginPath = "/ASPNET/Account/Login";
                //config.Cookies.ApplicationCookie.LogoutPath = "/ASPNET/Account/LogOff";
                //config.Cookies.ApplicationCookie.LoginPath = "/Auth/Login";
                //config.Cookies.ApplicationCookie.LogoutPath = "/Auth/Logout";
                // config.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents()
                // {
                //     OnRedirectToLogin = ctx =>
                //     {
                //         //if (ctx.Request.Path.StartsWithSegments("/ASPNET/api") && ctx.Response.StatusCode == 200)
                //         if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                //         {
                //             ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                //             return Task.FromResult<object>(null);
                //         }
                //         else
                //         {
                //             ctx.Response.Redirect(ctx.RedirectUri);
                //             return Task.FromResult<object>(null);
                //         }
                //     }
                // };

            })
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(options =>
            {
                options.LoginPath = "/Account/LogIn";
                options.LogoutPath = "/Account/LogOut";
                options.Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = ctx =>
                    {
                        //if (ctx.Request.Path.StartsWithSegments("/ASPNET/api") && ctx.Response.StatusCode == 200)
                        if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            return Task.FromResult<object>(null);
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                            return Task.FromResult<object>(null);
                        }
                    }
                };
            });

            services.AddAutoMapper();

            services.AddMvc()
            .AddMvcOptions(opt => opt.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter())); // determined from accept header of request

            // Add application services.
            if(_env.IsEnvironment("Development") || _env.IsEnvironment("Testing"))
            {
                services.AddScoped<IMailService, DebugMailService>();
            }
            else
            {
                // Implement a real Mail Service
                services.AddScoped<IMailService, DebugMailService>();
            }
            // services.AddTransient<IEmailSender, EmailSender>();
            services.AddTransient<CoordService>();
            services.AddLogging();
            services.AddScoped<IWorldRepository, WorldRepository>();
            services.AddTransient<AppContextSeedData>();
            services.AddTransient<WorldContextSeedData>();
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            services.AddSingleton<ISensorDataService, SensorDataService>();
            services.AddSingleton<IViewModelService, ViewModelService>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();






            // Leo End
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, WorldContextSeedData seeder, AppContextSeedData seederApp)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
            // Leo Start
                app.UseBrowserLink();
            // Leo End
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStatusCodePages(); // if the return object is status code only, then status code page is shown

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

        // Leo Start
            Mapper.Initialize(config =>
            {
                config.CreateMap<Trip, TripViewModel>().ReverseMap();
                config.CreateMap<Stop, StopViewModel>().ReverseMap();
                config.CreateMap<Favlink, FavlinkViewModel>().ReverseMap();
                config.CreateMap<Link, LinkViewModel>().ReverseMap();
                config.CreateMap<Cashflow, CashflowViewModel>().ReverseMap();
                config.CreateMap<Cashitem, CashitemViewModel>().ReverseMap();
            });

            seeder.EnsureSeedDataAsync().Wait();
            seederApp.EnsureSeedDataAsync().Wait();
        // Leo End

            // blank project statement
            // app.Run(async (context) =>
            // {
            //     await context.Response.WriteAsync("Hello World");
            // });

            // test dev developerException Page
            // app.Run((context) =>
            // {
            //     throw new Exception("Example Exception");
            // });
        }
    }
}
