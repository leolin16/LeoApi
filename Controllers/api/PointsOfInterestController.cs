using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeoPortal2.Models;
using Microsoft.AspNetCore.Mvc;

namespace LeoPortal2.Controllers.api
{
    [Route("api/cities/{cityId}/pointsofinterest")]
    public class PointsOfInterestController : Controller
    {
        [HttpGet("")]
        public IActionResult GetPointsOfInterest(int cityId)
        {
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
            if(city == null)
            {
                return NotFound();
            }
            return Ok(city.PointsOfInterest);
        }
        [HttpGet("{id}", Name = "GetPointOfInterest")]
        public IActionResult GetPointOfInterest(int cityId, int id)
        {
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
            if(city == null)
            {
                return NotFound();
            }
            var PointOfInterest = city.PointsOfInterest.FirstOrDefault(p => p.Id == id);
            if(PointOfInterest == null)
            {
                return NotFound();
            }
            return Ok(PointOfInterest);
        }
                [HttpPost("")]
        public IActionResult CreatePointOfInterest(int cityId, [FromBody] PointOfInterestForCreationDto pointOfInterest)
        {
            if(pointOfInterest == null)
            {
                return BadRequest();
            }
            if(ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(pointOfInterest.Description == pointOfInterest.Name)
            {
                ModelState.AddModelError("Description", "The provided description should be different from the name.");
            }
            var city = CitiesDataStore.Current.Cities.FirstOrDefault(c => c.Id == cityId);
            if(city == null)
            {
                return NotFound();
            }

            var maxPointOfInterestId = CitiesDataStore.Current.Cities.SelectMany(c => c.PointsOfInterest).Max(p => p.Id);

            var finalPointOfInterest = new PointOfInterestDto()
            {
                Id = ++maxPointOfInterestId,
                Name = pointOfInterest.Name,
                Description = pointOfInterest.Description
            };

            city.PointsOfInterest.Add(finalPointOfInterest);
            return CreatedAtRoute("GetPointOfInterest", new {cityId = cityId, id = finalPointOfInterest.Id}, finalPointOfInterest);
        }
    }
}