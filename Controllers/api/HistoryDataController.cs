// Leo Added
using System.Collections.Generic;
using LeoPortal2.Models;
using LeoPortal2.Services;
using Microsoft.AspNetCore.Mvc;

namespace LeoPortal2.Controllers.Api
{
    public class HistoryDataController : Controller
    {
        private readonly ISensorDataService sensorDataService;

        public HistoryDataController(ISensorDataService sensorDataService)
        {
            this.sensorDataService = sensorDataService;
        }

        public IEnumerable<IntHistoryModel> GetWaterTemperatureHistory()
        {
            return sensorDataService.GetWaterTemperatureFahrenheitHistory();
        }

        public IEnumerable<IntHistoryModel> GetFishMotionPercentageHistory()
        {
            return sensorDataService.GetFishMotionPercentageHistory();
        }

        public IEnumerable<IntHistoryModel> GetWaterOpacityPercentageHistory()
        {
            return sensorDataService.GetWaterOpacityPercentageHistory();
        }
        public IEnumerable<IntHistoryModel> GetLightIntensityLumensHistory()
        {
            return sensorDataService.GetLightIntensityLumensHistory();
        }
    }
}