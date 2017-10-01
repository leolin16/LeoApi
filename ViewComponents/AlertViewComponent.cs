// Leo Added
using LeoPortal2.Options;
using LeoPortal2.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeoPortal2.ViewComponents
{
    public class AlertViewComponent: ViewComponent
    {
        private ISensorDataService sensorDataService;
        private ThresholdOptions thresholdConfig;

        public AlertViewComponent(ISensorDataService sensorDataService, IOptions<ThresholdOptions> thresholdConfig)
        {
            this.sensorDataService = sensorDataService;
            this.thresholdConfig = thresholdConfig.Value;
        }

        public IViewComponentResult Invoke()
        {
            var viewModel = new List<string>();

            if (sensorDataService.GetFishMotionPercentage().Value > thresholdConfig.FishMotionMax)
                viewModel.Add("Too much fish activity");
            if (sensorDataService.GetFishMotionPercentage().Value < thresholdConfig.FishMotionMin)
                viewModel.Add("Looks like we have some dead fish");

            if (sensorDataService.GetLightIntensityLumens().Value > thresholdConfig.LightIntensityMax)
                viewModel.Add("Bright light, bright light!");
            if (sensorDataService.GetLightIntensityLumens().Value < thresholdConfig.LightIntensityMin)
                viewModel.Add("It's dark out here");

            if (sensorDataService.GetWaterOpacityPercentage().Value > thresholdConfig.WaterOpacityMax)
                viewModel.Add("The fish can't see you");
            if (sensorDataService.GetWaterOpacityPercentage().Value < thresholdConfig.WaterOpacityMin)
                viewModel.Add("Water too clean");

            if (sensorDataService.GetWaterTemperatureFahrenheit().Value > thresholdConfig.WaterTemperatureMax)
                viewModel.Add("Water too hot!");
            if (sensorDataService.GetWaterTemperatureFahrenheit().Value < thresholdConfig.WaterTemperatureMin)
                viewModel.Add("Water too cold!");

            return View(viewModel);
        }
    }
}
