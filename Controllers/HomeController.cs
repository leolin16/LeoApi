using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LeoPortal2.Models;
using LeoPortal2.Models.Interfaces;
using Microsoft.Extensions.Configuration;
using LeoPortal2.Services;
using Microsoft.Extensions.Logging;
using LeoPortal2.Models.PageViewModels;

namespace LeoPortal2.Controllers
{
    public class HomeController : Controller
    {
    // Leo Start
        private readonly IViewModelService viewModelService;
        private IWorldRepository _repository;
        private ILogger<HomeController> _logger;
        private IConfiguration _config;
        private IMailService _mailService;
        private CommonServiceResult Result;
        public HomeController(IViewModelService viewModelService, IWorldRepository repository, ILogger<HomeController> logger, IMailService mailService, IConfiguration config)
        {
            this.viewModelService = viewModelService;
            _repository = repository;
            _logger = logger;
            _mailService = mailService;
            _config = config;
        }
        // GET: /<controller>/
        public IActionResult Dashboard()
        {
            ViewBag.Title = "Fish tank dashboard app";
            return View(viewModelService.GetDashboardViewModel());
        }

        public IActionResult Feed(int foodAmount)
        {
            var model = viewModelService.GetDashboardViewModel();
            model.LastFed = $"{DateTime.Now.Hour}:{DateTime.Now.Minute}. Amount: {foodAmount}";
            return View("Dashboard", model);
        }
    // Leo End
        public IActionResult Index()
        {
        // Leo Start
            try
            {
                var data = _repository.GetAllTrips();
                return View(data);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get Trips in Index page: {ex.Message}");
                return Redirect("/Error");
            }
        // Leo End
            //return View();
        }

        public IActionResult Ptm()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Well, When do you plan to marry me, VV?";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Please enter your contact Info to contact Leo Lin.";

            return View();
        }
    // Leo Start
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
    // Leo End

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
