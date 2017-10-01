// Leo Added
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LeoPortal2.Models.PageViewModels;

namespace LeoPortal2.Services
{
    public interface IViewModelService
    {
        DashboardViewModel GetDashboardViewModel();
    }
}
