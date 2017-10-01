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
    //[Route("ASPNET/api/cashflows/{cashflowName}/cashitems")]
    [Route("api/cashflows/{cashflowName}/cashitems")]
    public class CashitemsController : Controller
    {
        private Cashitem newCashitem;
        private Cashflow results;
        private Cashitem result;
        private ILogger<CashitemsController> _logger;
        private IWorldRepository _repository;

        public CashitemsController(IWorldRepository repository, ILogger<CashitemsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        // GET: api/values
        [HttpGet("")]
        public IActionResult Get(string cashflowName)
        {
            try
            {

                results = _repository.GetCashflowByName(cashflowName, User.Identity.Name);
                //if (results == null)
                //{
                //    return Json(null);
                //}
                return Ok(Mapper.Map<IEnumerable<CashitemViewModel>>(results.Cashitems.OrderBy(i => i.TransactionDate).ToList()));

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get cash items for cash flow collection {cashflowName}", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest("Error occurred finding cash flow collection name");
            }
        }
        // GET api/values/5
        [HttpGet("{cashitemId}")]
        public IActionResult Get(string cashflowName, int cashitemId)
        {
            try
            {

                result = _repository.GetCashitem(cashflowName, User.Identity.Name, cashitemId);
                //if (result == null)
                //{
                //    return Json(null);
                //}
                return Ok(Mapper.Map<CashitemViewModel>(result));

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get specified cash item for cash flow collection {cashflowName}", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest("Error occurred finding specific cash item of cash flow collection");
            }
        }

        // POST api/values
        [HttpPost("")]
        public async Task<IActionResult> Post(string cashflowName, [FromBody]CashitemViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //Map to the Entity
                    newCashitem = Mapper.Map<Cashitem>(vm);

                    //Save to the database
                    _repository.AddCashitem(cashflowName, User.Identity.Name, newCashitem);
                    if (await _repository.SaveAllAsync())
                    {
                        //Response.StatusCode = (int)HttpStatusCode.Created;
                        return Created($"api/trips/{cashflowName}/cashitems/{newCashitem.Id}", Mapper.Map<CashitemViewModel>(newCashitem));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to save new cash item {cashflowName}", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest("Error occurred saving new cash item");
            }
            //Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return BadRequest("Validation failed on new cash item");
        }

        // PUT api/values/5
        [HttpPut("")]
        public async Task<IActionResult> Put(string cashflowName, [FromBody]CashitemViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    //Map to the Entity
                    newCashitem = Mapper.Map<Cashitem>(vm);

                    //Save to the database
                    _repository.EditCashitem(cashflowName, User.Identity.Name, newCashitem);
                    if (await _repository.SaveAllAsync())
                    {
                        //Response.StatusCode = (int)HttpStatusCode.Created;
                        return Created($"api/trips/{cashflowName}/cashitems/{newCashitem.Id}", Mapper.Map<CashitemViewModel>(newCashitem));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to edit cash item for {cashflowName}", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest("Error occurred saving cash item editing");
            }
            //Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return BadRequest("Validation failed on editing cash item");
        }

        // DELETE api/values/5
        [HttpDelete("{delCashitemId}")]
        public async Task<IActionResult> Delete(string cashflowName, int delCashitemId)
        {
            try
            {
                //Save to the database
                _repository.DelCashitem(cashflowName, User.Identity.Name, delCashitemId);
                    if (await _repository.SaveAllAsync())
                    {
                        //Response.StatusCode = (int)HttpStatusCode.Created;
                        return Created($"api/trips/{cashflowName}/cashitems", "deleted");
                    }

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to delete cash item for {cashflowName}", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest("Error occurred saving cash item deletion");
            }
            //Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return BadRequest("Validation failed on deleting cash item");
        }
    }
}
