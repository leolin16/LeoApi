// Leo Added
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LeoPortal2.Models.PageViewModels
{
    public class LinkViewModel
    {
        public int Id { get; set; }
        [StringLength(255, MinimumLength = 2)]
        public string TitleLevel1 { get; set; }
        [StringLength(255, MinimumLength = 4)]
        public string TitleLevel2 { get; set; }
        [StringLength(255, MinimumLength = 2)]
        public string TitleLevel3 { get; set; }
        [StringLength(255, MinimumLength = 2)]
        public string TitleLevel4 { get; set; }
        [Required]
        [StringLength(255, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(65535, MinimumLength = 4)]
        public string URL { get; set; }

    }
}
