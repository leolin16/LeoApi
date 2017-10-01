// Leo Added
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeoPortal2.Models;
using LeoPortal2.Models.Interfaces;
using LeoPortal2.Models.PageViewModels;
using System.Net;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace LeoPortal2.Controllers.api
{
    [Authorize]
    //[Route("ASPNET/api/trips")]
    [Route("api/trips")]
    public class TripsController : Controller
    {
        private Trip newTrip;
        private IEnumerable<TripViewModel> results;
        private IEnumerable<Trip> trips;
        private ILogger<TripsController> _logger;
        private IWorldRepository _repository;

        public TripsController(IWorldRepository repository, ILogger<TripsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        [HttpGet("")]
        public IActionResult Get()
        {
            try
            {
                trips = _repository.GetUserTripsWithStops(User.Identity.Name);
                results = Mapper.Map<IEnumerable<TripViewModel>>(trips);
                //if (true) return BadRequest("Bad things happened");
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to get all trips", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest(new { Message = ex.Message });
            }

        }
        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]TripViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    newTrip = Mapper.Map<Trip>(vm);
                    newTrip.UserName = User.Identity.Name;
                    // Save it to the database
                    _logger.LogInformation("Attempting to save a new trip");
                    _repository.AddTrip(newTrip);

                    if (await _repository.SaveAllAsync())
                    {
                        //Response.StatusCode = (int) HttpStatusCode.Created;
                        return Created($"api/trips/{newTrip.Name}", Mapper.Map<TripViewModel>(newTrip));
                    }
                    //else
                    //{
                    //    return BadRequest("Failed to save new trip to the database");
                    //}
                }
                //return BadRequest("Bad Data"); //not returning modelstate here is to hide true identity in front of public api circumstances
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new trip", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest(new { Message = ex.Message });
            }
            //Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return BadRequest(new { Message = "Failed to save new trip to the database or Bad Data", ModelState = ModelState });
        }
    }
}