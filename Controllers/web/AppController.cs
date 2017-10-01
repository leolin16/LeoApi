// Leo Added
using LeoPortal2.Models;
using LeoPortal2.Models.Interfaces;
using LeoPortal2.Models.PageViewModels;
using LeoPortal2.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeoPortal2.Controllers.web
{
    public class AppController : Controller
    {
        private CommonServiceResult Result;
        private IMailService _mailService;
        private IConfiguration _config;

        //use repository instead of context
        //private WorldContext _context;

        private IWorldRepository _repository;
        private ILogger<AppController> _logger;

        ////private IEnumerable<Trip> trips;

        //public AppController(IMailService service, IWorldRepository repository)
        public AppController(IMailService mailService, IConfiguration config, IWorldRepository repository, ILogger<AppController> logger)
        {
            _mailService = mailService;
            _config = config;

            //use repository instead of context
            //_context = context;

            //instead of using repository directly, I've implemented it by calling API
            _repository = repository;
            _logger = logger;
        }
        public IActionResult Index()
        {
            try
            {
                var data = _repository.GetAllTrips();
                return View(data);
                //return View();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Trips in Index page: {ex.Message}");
                return Redirect("/Error");
            }
        }

        [Authorize]
        public IActionResult Trips()
        {
            //var trips = _repository.GetAllTrips();
            return View(/*trips*/);
        }
        [Authorize]
        public IActionResult Favlinks()
        {
            return View();
        }
        public IActionResult Cashflows()
        {
            return View();
        }
        public IActionResult Computers()
        {
            return View();
        }
        public IActionResult Codesnippets()
        {
            return View();
        }
        public IActionResult About()
        {
            return View();
        }
        public IActionResult Results()
        {
            return View();
        }
        public IActionResult Contact()
        {
            //throw new InvalidOperationException("Bad things happen to good developers");
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Contact(ContactViewModel model)
        {
            var email = _config["AppSettings:SiteEmailAddress"];
            var smtpPW = _config["AppSettings:DefaultUserKey"];
            if (string.IsNullOrWhiteSpace(email))
            {
                ModelState.AddModelError("", "Could not send email, configuration problem.");
            }
            if (string.IsNullOrWhiteSpace(model.Email))
            {
                ModelState.AddModelError("Email", "Could not send email, input address of sender is not valid.");
            }
            if (model.Email.Contains("aol.com"))
            {
                ModelState.AddModelError("", "We don't support AOL addresses");
            }
            if (ModelState.IsValid)
            {
                Result = await _mailService.SendMail(email, smtpPW, email, model.Email, $"Contact Page from {model.Name} ({model.Email})", model.Message);
                Result = await _mailService.SendMail(email, smtpPW, model.Email, email, $"Reply Page to {model.Name} ({model.Email})", model.Message);
                ModelState.Clear();
                ViewBag.Message = "Mail Sent. Thanks!";
            }

            return View();
        }
    }

}
