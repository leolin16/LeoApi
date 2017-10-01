// Leo Added
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeoPortal2.Models
{
    public class Party
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PartyName { get; set; }
        public string Description { get; set; }
        public string Representation { get; set; }
    }
}
