using System;
using System.Collections.Generic;
using System.Text;

namespace fieryLotos.Ports.Driven.QueryModel
{
    public class UserPermissions
    {
        public bool CanEditArticles { get; set; }
        public bool CanEditTags { get; set; }
        public bool CanEditKeyWords { get; set; }
    }
}
