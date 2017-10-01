// Leo Added
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeoPortal2.Models
{
    public class Cashitem
    {
        public int Id { get; set; }
        public DateTime TransactionDate { get; set; }
        public string FlowDirection { get; set; }
        public string FromParty { get; set; }
        public string ToParty { get; set; }
        public double MoneyAmount { get; set; }
        public string MoneyUnit { get; set; }
        public string MoneyDescription { get; set; }
    }
}
