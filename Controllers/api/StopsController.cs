// Leo Added
using LeoPortal2.Models;
using LeoPortal2.Models.Interfaces;
using LeoPortal2.Models.PageViewModels;
using LeoPortal2.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace LeoPortal2.Controllers.api
{
    [Authorize]
    //[Route("ASPNET/api/trips/{tripName}/stops")]
    [Route("api/trips/{tripName}/stops")]
    public class StopsController : Controller
    {
        private CoordServiceResult coordResult;
        private Stop newStop;
        private Trip results;
        private CoordService _coordService;
        private ILogger<StopsController> _logger;
        private IWorldRepository _repository;

        public StopsController(IWorldRepository repository, ILogger<StopsController> logger, CoordService coordService)
        {
            _repository = repository;
            _logger = logger;
            _coordService = coordService;
        }
        [HttpGet("")]
        public IActionResult Get(string tripName)
        {
            try
            {

                results = _repository.GetTripByName(tripName, User.Identity.Name);
                //if (results == null)
                //{
                //    return Json(null);
                //}
                //else
                //{

                    return Ok(Mapper.Map<IEnumerable<StopViewModel>>(results.Stops.OrderBy(s => s.Order).ToList()));
                //}

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get stops for trip {tripName}", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest("Error occurred finding trip name");
            }
            //return BadRequest("Failed to get stops");
        }
        [HttpPost("")]
        public async Task<IActionResult> Post(string  tripName, [FromBody]StopViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //Map to the Entity
                    newStop = Mapper.Map<Stop>(vm);
                    //Looking up Geocoordinates
                    coordResult = await _coordService.GetCoordsAsync(newStop.Name);

                    if(!coordResult.Success)
                    {
                        _logger.LogError(coordResult.Message);
                        //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                        return BadRequest(coordResult.Message);
                    }
                    else
                    {
                        newStop.Longitude = coordResult.Longitude;
                        newStop.Latitude = coordResult.Latitude;
                        //Save to the database
                        _repository.AddStop(tripName, User.Identity.Name, newStop);
                        if (await _repository.SaveAllAsync())
                        {
                            //Response.StatusCode = (int)HttpStatusCode.Created;
                            return Created($"api/trips/{tripName}/stops/{newStop.Name}", Mapper.Map<StopViewModel>(newStop));
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save new stop {tripName}", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest("Error occurred saving new stop");
            }
            //Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return BadRequest("Validation failed on new stop");
        }
    }
}
