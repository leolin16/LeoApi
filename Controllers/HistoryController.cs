// Leo Added
using LeoPortal2.Models.PageViewModels;
using Microsoft.AspNetCore.Mvc;

namespace LeoPortal2.Controllers
{
    public class HistoryController : Controller
    {
        public IActionResult GetWaterTemperatureChart()
        {
            return View("Chart", new ChartViewModel
            {
                Title = "Water Temperature",
                DataUrl = Url.Action("GetWaterTemperatureHistory", "HistoryData")
            });
        }
        public IActionResult GetFishMotionPercentageChart()
        {
            return View("Chart", new ChartViewModel
            {
                Title = "Fish Motion",
                DataUrl = Url.Action("GetFishMotionPercentageHistory", "HistoryData")
            });
        }

        public IActionResult GetWaterOpacityPercentageChart()
        {
            return View("Chart", new ChartViewModel
            {
                Title = "Water Opacity",
                DataUrl = Url.Action("GetWaterOpacityPercentageHistory", "HistoryData")
            });
        }

        public IActionResult GetLightIntensityLumensChart()
        {
            return View("Chart", new ChartViewModel
            {
                Title = "Light Intensity",
                DataUrl = Url.Action("GetLightIntensityLumensHistory", "HistoryData")
            });
        }
    }
}