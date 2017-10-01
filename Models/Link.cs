// Leo Added
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeoPortal2.Models
{
    public class Link
    {
        public int Id { get; set; }
        public string TitleLevel1 { get; set; }
        public string TitleLevel2 { get; set; }
        public string TitleLevel3 { get; set; }
        public string TitleLevel4 { get; set; }
        public string Name { get; set; }
        public string URL { get; set; }
        public int Order { get; set; }
    }
}
