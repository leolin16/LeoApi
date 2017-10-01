// Leo Added
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LeoPortal2.Models.PageViewModels
{
    public class TripViewModel
    {
        // might not need, temporarily commented out
        //public int Id { get; set; }
        [Required]
        [StringLength(255,MinimumLength = 5)]
        public string Name { get; set; }

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public IEnumerable<StopViewModel> Stops { get; set; }

    }
}
