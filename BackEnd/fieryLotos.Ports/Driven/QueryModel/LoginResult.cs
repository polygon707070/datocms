using System;
using System.Collections.Generic;
using System.Text;

namespace fieryLotos.Ports.Driven.QueryModel
{
    public class LoginResult
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public string Token { get; set; }
        public UserPermissions Permissions { get; set; }
    }
}
