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
    //[Route("ASPNET/api/cashflows")]
    [Route("api/cashflows")]
    public class CashflowsController : Controller
    {
        private Cashflow newCashflow;
        private IEnumerable<CashflowViewModel> results;
        private IEnumerable<Cashflow> cashflows;
        private ILogger<CashflowsController> _logger;
        private IWorldRepository _repository;
        private double totalBalance;

        public CashflowsController(IWorldRepository repository, ILogger<CashflowsController> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        // GET: api/values
        [HttpGet("")]
        public IActionResult Get()
        {
            try
            {
                cashflows = _repository.GetUserCashflowsWithCashitems(User.Identity.Name);
                //if (cashflows == null)
                //{
                //    return Json(null);
                //}
                results = Mapper.Map<IEnumerable<CashflowViewModel>>(cashflows);
                return Ok(results);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get cash flow collections for {User.Identity.Name}", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest("Error occurred finding cash flow collections");
            }
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        //get total balance for one cash flow
        [HttpGet("{cashflowName}/totalBalance")]
        public IActionResult Get(string cashflowName)
        {
            try
            {
                totalBalance = _repository.GetCashflowTotalByName(cashflowName, User.Identity.Name);
                return Ok(totalBalance);

            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to get cash item's Balance for cash flow collection {cashflowName}", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest(0);
            }
        }
        // POST api/values
        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]CashflowViewModel vm)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    newCashflow = Mapper.Map<Cashflow>(vm);
                    newCashflow.UserName = User.Identity.Name;
                    // Save it to the database
                    _logger.LogInformation("Attempting to save a new cash flow collection");
                    _repository.AddCashflow(newCashflow);

                    if (await _repository.SaveAllAsync())
                    {
                        //Response.StatusCode = (int)HttpStatusCode.Created;
                        return Created($"api/trips/{newCashflow.Name}", Mapper.Map<CashflowViewModel>(newCashflow));
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("Failed to save new cash flow collection", ex);
                //Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return BadRequest(new { Message = ex.Message });
            }
            //Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return BadRequest(new { Message = "Failed to save new cashflow to the database or Bad Data", ModelState = ModelState });
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
