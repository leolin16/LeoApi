// Leo Added
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LeoPortal2.Models.PageViewModels
{
    public class SensorTileViewModel
    {
        public string Title { get; set; }
        public int Value { get; set; }
        public string Url { get; set; }
        public string IconCssClass { get; set; }
        public string ColorCssClass { get; set; }
    }
}
