// Leo Added
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.Extensions.Logging;
using LeoPortal2.Models;
using LeoPortal2.Models.Interfaces;
using LeoPortal2.Models.PageViewModels;
using LeoPortal2.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace LeoPortal2.Controllers.api
{
    [Authorize]
    //[Route("ASPNET/api/favlinks/{favlinkName}/links")]
    [Route("api/favlinks/{favlinkName}/links")]
    public class LinksController : Controller
    {
        private Link newLink;
        private Favlink results;
        private Link result;
        private ILogger<LinksController> _logger;
        private IWorldRepository _repository;

        public LinksController(IWorldRepository repository, ILogger<LinksController> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        // GET: api/values
        [HttpGet("")]
        public JsonResult Get(string favlinkName)
        {
            try
            {

                results = _repository.GetFavlinkByName(favlinkName, User.Identity.Name);
                if (results == null)
                {
                    return Json(null);
                }
                return Json(Mapper.Map<IEnumerable<LinkViewModel>>(results.Links.OrderBy(l => l.Order)));

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get links for favourite link collection {favlinkName}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding favourite link collection name");
            }
        }
        // GET api/values/5
        [HttpGet("{linkName}")]
        public JsonResult Get(string favlinkName, string linkName)
        {
            try
            {

                result = _repository.GetLinkByName(favlinkName, linkName, User.Identity.Name);
                if (result == null)
                {
                    return Json(null);
                }
                return Json(Mapper.Map<LinkViewModel>(result));

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get link for favourite link collection {favlinkName} with name of {linkName}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred finding link name of favourite link collection");
            }
        }

        // POST api/values
        [HttpPost("")]
        public JsonResult Post(string favlinkName, [FromBody]LinkViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //Map to the Entity
                    newLink = Mapper.Map<Link>(vm);

                    //Save to the database
                    _repository.AddLink(favlinkName, User.Identity.Name, newLink);
                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<LinkViewModel>(newLink));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save new link {favlinkName}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred saving new link");
            }
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Validation failed on new link");
        }

        // PUT api/values/5
        [HttpPut("")]
        public JsonResult Put(string favlinkName, [FromBody]LinkViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //Map to the Entity
                    newLink = Mapper.Map<Link>(vm);

                    //Save to the database
                    _repository.EditLink(favlinkName, User.Identity.Name, newLink);
                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<LinkViewModel>(newLink));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to edit link {favlinkName}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error occurred saving link editing");
            }
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json("Validation failed on editing link");
        }

        // DELETE api/values/5
        [HttpDelete("{delLinkId}")]
        public string Delete(string favlinkName, int delLinkId)
        {
            try
            {
                //Save to the database
                _repository.DelLink(favlinkName, User.Identity.Name, delLinkId);
                    if (_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return "deleted";
                    }

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete link {favlinkName}", ex);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return "Error occurred saving link deletion";
            }
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return "Validation failed on deleting link";
        }
    }
}
