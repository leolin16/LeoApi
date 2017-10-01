// Leo Added
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LeoPortal2.Models.Interfaces
{
    public interface IWorldRepository
    {
        IEnumerable<Trip> GetAllTrips();
        IEnumerable<Trip> GetAllTripsWithStops();
        void AddTrip(Trip newTrip);
        bool SaveAll();
        Task<bool> SaveAllAsync();
        Trip GetTripByName(string tripName, string username);
        void AddStop(string tripName, string username, Stop newStop);
        IEnumerable<Trip> GetUserTripsWithStops(string name);
        IEnumerable<Favlink> GetUserFavlinksWithLinks(string name);
        IEnumerable<Cashflow> GetUserCashflowsWithCashitems(string name);
        void AddFavlink(Favlink newFavlink);
        void AddCashflow(Cashflow newCashflow);
        Favlink GetFavlinkByName(string favlinkName, string username);
        Cashflow GetCashflowByName(string cashflowName, string username);
        double GetCashflowTotalByName(string cashflowName, string username);
        Link GetLinkByName(string favlinkName, string linkName, string username);
        Cashitem GetCashitem(string cashflowName, string username, int cashitemId);
        void AddLink(string favlinkName, string username, Link newLink);
        void AddCashitem(string cashflowName, string username, Cashitem newCashitem);
        void EditLink(string favlinkName, string username, Link newLink);
        void EditCashitem(string cashflowName, string username, Cashitem newCashitem);
        void DelLink(string favlinkName, string username, int delLinkId);
        void DelCashitem(string cashflowName, string username, int delCashitemId);
    }
}