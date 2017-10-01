// Leo Added
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LeoPortal2.Models;
using LeoPortal2.Models.Interfaces;
using LeoPortal2.Models.PageViewModels;
using System.Net;
using AutoMapper;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace LeoPortal2.Controllers.api
{
    [Authorize]
    //[Route("ASPNET/api/favlinks")]
    [Route("api/favlinks")]
    public class FavlinksController : Controller
    {
        private Favlink newFavlink;
        private IEnumerable<FavlinkViewModel> results;
        private IEnumerable<Favlink> favlinks;
        private ILogger<FavlinksController> _logger;
        private IWorldRepository _repository;
        public FavlinksController(IWorldRepository repository, ILogger<FavlinksController> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        // GET: api/values
        [HttpGet("")]
        public JsonResult Get()
        {
            try
            {
                favlinks = _repository.GetUserFavlinksWithLinks(User.Identity.Name);
                if (favlinks == null)
                {
                    return Json(null);
                }
                results = Mapper.Map<IEnumerable<FavlinkViewModel>>(favlinks);
                return Json(results);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get favourite link collections for {User.Identity.Name}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding favourite link collections");
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost("")]
        public JsonResult Post([FromBody]FavlinkViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    newFavlink = Mapper.Map<Favlink>(vm);
                    newFavlink.UserName = User.Identity.Name;
                    // Save it to the database
                    _logger.LogInformation("Attempting to save a new favourite link collection");
                    _repository.AddFavlink(newFavlink);

                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<FavlinkViewModel>(newFavlink));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new favourite link collection", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = ex.Message });
            }
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new { Message = "Failed", ModelState = ModelState });
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
