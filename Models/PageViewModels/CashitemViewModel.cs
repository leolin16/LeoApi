// Leo Added
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeoPortal2.Models.PageViewModels
{
    public class CashitemViewModel
    {
        public int Id { get; set; }

        [Required]
        //[DataType(DataType.Date)]
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime TransactionDate { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 2)]
        public string FlowDirection { get; set; }

        [StringLength(40, MinimumLength = 2)]
        public string FromParty { get; set; }

        [StringLength(40, MinimumLength = 2)]
        public string ToParty { get; set; }

        [Required]
        public double MoneyAmount { get; set; }

        [Required]
        [StringLength(40, MinimumLength = 1)]
        public string MoneyUnit { get; set; }

        [StringLength(255, MinimumLength = 2)]
        public string MoneyDescription { get; set; }

    }
}
