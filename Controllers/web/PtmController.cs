using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LeoPortal2.Controllers.web
{
    public class PtmController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}