// Leo Added
using LeoPortal2.Models;
using System.Collections.Generic;

namespace LeoPortal2.Services
{
    public interface ISensorDataService
    {
        IntHistoryModel GetWaterTemperatureFahrenheit();
        IEnumerable<IntHistoryModel> GetWaterTemperatureFahrenheitHistory();
        IntHistoryModel GetFishMotionPercentage();
        IEnumerable<IntHistoryModel> GetFishMotionPercentageHistory();
        IntHistoryModel GetWaterOpacityPercentage();
        IEnumerable<IntHistoryModel> GetWaterOpacityPercentageHistory();
        IntHistoryModel GetLightIntensityLumens();
        IEnumerable<IntHistoryModel> GetLightIntensityLumensHistory();
    }
}
