using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace LeoPortal2.Controllers.api
{
    [Route("api/[controller]")]
    public class CitiesController : Controller
    {
        [HttpGet("")]
        public IActionResult GetCities()
        {
            return Ok(CitiesDataStore.Current.Cities);
            // no notfound here coz cities collection is valid even zero result.
        }
        [HttpGet("{id}")]
        public IActionResult GetCity(int id)
        {
            var cityToReturn = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == id);
            if(cityToReturn == null)
            {
                return NotFound();
            }
            return Ok(cityToReturn);
        }
    }
}