// Leo Added
//using Microsoft.Data.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeoPortal2.Models.Interfaces;

namespace LeoPortal2.Models
{
    public class WorldRepository : IWorldRepository
    {
        private Cashflow theCashflow;
        private Cashitem theCashitem;
        private Favlink theFavlink;
        private Link theLink;
        private Trip theTrip;
        private WorldContext _context;
        private ILogger<WorldRepository> _logger;

        public WorldRepository(WorldContext context, ILogger<WorldRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void AddCashflow(Cashflow newCashflow)
        {
            _context.Add(newCashflow);
        }

        public void AddCashitem(string cashflowName, string username, Cashitem newCashitem)
        {
            theCashflow = GetCashflowByName(cashflowName, username);
            //if (theCashflow.Cashitems.Count < 1)
            //{
            //}
            //else
            //{
            //}
            theCashflow.Cashitems.Add(newCashitem);
            _context.Cashitems.Add(newCashitem);
        }

        public void AddFavlink(Favlink newFavlink)
        {
            _context.Add(newFavlink);
        }

        public void AddLink(string favlinkName, string username, Link newLink)
        {
            theFavlink = GetFavlinkByName(favlinkName, username);
            if (theFavlink.Links.Count < 1)
            {
                newLink.Order = 1;
            }
            else
            {
                newLink.Order = theFavlink.Links.Max(l => l.Order) + 1;
            }
            theFavlink.Links.Add(newLink);
            _context.Links.Add(newLink);
        }

        public void AddStop(string tripName, string username, Stop newStop)
        {
            theTrip = GetTripByName(tripName, username);
            if(theTrip != null)
            {
                if(theTrip.Stops.Count < 1)
                {
                    newStop.Order = 1;
                }
                else
                {
                    newStop.Order = theTrip.Stops.Max(s => s.Order) + 1;
                }
                theTrip.Stops.Add(newStop);
                _context.Stops.Add(newStop);
            }
        }

        public void AddTrip(Trip newTrip)
        {
            _context.Add(newTrip);
        }

        public void DelCashitem(string cashflowName, string username, int delCashitemId)
        {
            theCashflow = GetCashflowByName(cashflowName, username);
            theCashitem = _context.Cashitems.FirstOrDefault(d => d.Id == delCashitemId);
            if (theCashitem != null && theCashflow != null)
            {
                theCashflow.Cashitems.Remove(theCashitem);
                _context.Cashitems.Remove(theCashitem);
            }
        }

        public void DelLink(string favlinkName, string username, int delLinkId)
        {
            theFavlink = GetFavlinkByName(favlinkName, username);
            theLink = _context.Links.FirstOrDefault(d => d.Id == delLinkId);
            if (theLink != null && theFavlink != null)
            {
                theFavlink.Links.Remove(theLink);
                _context.Links.Remove(theLink);
            }
        }

        public void EditCashitem(string cashflowName, string username, Cashitem newCashitem)
        {
            theCashitem = GetCashitem(cashflowName, username, newCashitem.Id);
            if (theCashitem != null)
            {
                theCashitem.TransactionDate = newCashitem.TransactionDate;
                theCashitem.FlowDirection = newCashitem.FlowDirection;
                theCashitem.FromParty = newCashitem.FromParty;
                theCashitem.ToParty = newCashitem.ToParty;
                theCashitem.MoneyAmount = newCashitem.MoneyAmount;
                theCashitem.MoneyUnit = newCashitem.MoneyUnit;
                theCashitem.MoneyDescription = newCashitem.MoneyDescription;
            }
        }

        public void EditLink(string favlinkName, string username, Link newLink)
        {
            theLink = GetLinkByName(favlinkName, newLink.Name, username);
            if (theLink != null)
            {
                theLink.TitleLevel1 = newLink.TitleLevel1;
                theLink.TitleLevel2 = newLink.TitleLevel2;
                theLink.TitleLevel3 = newLink.TitleLevel3;
                theLink.TitleLevel4 = newLink.TitleLevel4;
                theLink.URL = newLink.URL;
            }
        }

        public IEnumerable<Trip> GetAllTrips()
        {
            try
            {
                _logger.LogInformation("Getting All trips from the database");
                return _context.Trips.OrderBy(t => t.Name).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips from database", ex);
                return null;
            }
        }
        public IEnumerable<Trip> GetAllTripsWithStops()
        {
            try
            {
                return _context.Trips
                    .Include(t => t.Stops)
                    .OrderBy(t => t.Name)
                    .ToList();
            }
            catch(Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public Cashflow GetCashflowByName(string cashflowName, string username)
        {
            try
            {
                return _context.Cashflows.Include(c => c.Cashitems)
                    .Where(c => c.Name == cashflowName && c.UserName == username)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Could not get the cash flow collection {cashflowName} from database", ex);
                return null;
            }
        }
        public double GetCashflowTotalByName(string cashflowName, string username)
        {
            try
            {
                return (_context.Cashflows.Include(c => c.Cashitems)
                    .Where(c => c.Name == cashflowName && c.UserName == username)
                    .FirstOrDefault()
                    .Cashitems
                    .Where(i => (i.FlowDirection) == "In")
                    .Sum(i => i.MoneyAmount)
                    -
                    _context.Cashflows.Include(c => c.Cashitems)
                    .Where(c => c.Name == cashflowName && c.UserName == username)
                    .FirstOrDefault()
                    .Cashitems
                    .Where(i => (i.FlowDirection) == "Out")
                    .Sum(i => i.MoneyAmount)

                    );
            }
            catch (Exception ex)
            {
                _logger.LogError($"Could not get the cash flow {cashflowName}'s total balance from database", ex);
                return 0;
            }
        }
        public Cashitem GetCashitem(string cashflowName, string username, int cashitemId)
        {
            try
            {
                return _context.Cashflows.Include(c => c.Cashitems)
                    .Where(c => c.Name == cashflowName && c.UserName == username)
                    .FirstOrDefault()
                    .Cashitems.
                    Where(i => i.Id == cashitemId)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Could not get the specified cash item for cash flow collection {cashflowName} from database", ex);
                return null;
            }
        }

        public Favlink GetFavlinkByName(string favlinkName, string username)
        {
            try
            {
                return _context.Favlinks.Include(f => f.Links)
                    .Where(f => f.Name == favlinkName && f.UserName == username)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Could not get the favourite link collection {favlinkName} from database", ex);
                return null;
            }
        }

        public Link GetLinkByName(string favlinkName, string linkName, string username)
        {
            try
            {
                return _context.Favlinks.Include(f => f.Links)
                    .Where(f => f.Name == favlinkName && f.UserName == username)
                    .FirstOrDefault()
                    .Links.
                    Where(l => l.Name == linkName)
                    .FirstOrDefault();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Could not get the link of {linkName} for favourite link collection {favlinkName} from database", ex);
                return null;
            }
        }

        public Trip GetTripByName(string tripName, string username)
        {
            return _context.Trips.Include(t => t.Stops)
                .Where(t => t.Name == tripName && t.UserName == username)
                .FirstOrDefault();
        }

        public IEnumerable<Cashflow> GetUserCashflowsWithCashitems(string name)
        {
            try
            {
                return _context.Cashflows
                .Include(c => c.Cashitems)
                .OrderBy(c => c.Name)
                .Where(c => c.UserName == name)
                .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get cash flow collections with cash items from database", ex);
                return null;
            }
        }

        public IEnumerable<Favlink> GetUserFavlinksWithLinks(string name)
        {
            try
            {
                return _context.Favlinks
                .Include(f => f.Links)
                .OrderBy(f => f.Name)
                .Where(f => f.UserName == name)
                .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get favourite link collections with links from database", ex);
                return null;
            }
        }

        public IEnumerable<Trip> GetUserTripsWithStops(string name)
        {
            try
            {
                return _context.Trips
                    .Include(t => t.Stops)
                    .OrderBy(t => t.Name)
                    .Where(t => t.UserName == name)
                    .ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError("Could not get trips with stops from database", ex);
                return null;
            }
        }

        public bool SaveAll()
        {
            return _context.SaveChanges() > 0;
        }

        public async Task<bool> SaveAllAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
    }
}
