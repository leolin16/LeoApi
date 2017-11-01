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
using LeoPortal2.Models;

// just for writeAsync method
using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.Mvc.Formatters;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace LeoPortal2
{
    public class Startup
    {
    // Leo Start
        //public static IConfigurationRoot Configuration; //adding static to make it callable to other files, found by Leo
        private IHostingEnvironment _env;
        // private IConfigurationRoot _config;
        private void ConfigureSettings(IServiceCollection services)
        {
            var configBuilder = new ConfigurationBuilder()
                .SetBasePath(_env.ContentRootPath);

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


            services.AddAutoMapper();

            services.AddMvc()
            .AddMvcOptions(opt => opt.OutputFormatters.Add(new XmlDataContractSerializerOutputFormatter())); // determined from accept header of request

            // Add application services.
            // services.AddTransient<IEmailSender, EmailSender>();
            services.AddLogging();

            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

            // Leo End
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                // app.UseDatabaseErrorPage();
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

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

            });

            // Leo Start

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
