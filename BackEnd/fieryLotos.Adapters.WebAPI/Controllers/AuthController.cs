using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using fieryLotos.Ports.Driven.QueryModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace fieryLotos.Adapters.WebAPI.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthorizationService authorizationService;

        [HttpPost, Route("login")]
        public IActionResult Login([FromBody]LoginQuery user)
        {
            if (user == null)
            {
                return BadRequest("Invalid client request");
            }
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>();
            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:4200",
                audience: "https://localhost:44361",
                claims: claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: signinCredentials
            );
            var tokenString = "";

            LoginResult loginResult = new LoginResult();

            if (user.UserName == "superman" && user.Password == "superman")
            {
                claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, "Editor"),
                    new Claim(ClaimTypes.Role, "Manager")
                };

                tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:4200",
                    audience: "https://localhost:44361",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                loginResult = new LoginResult
                {
                    Success = true,
                    ErrorMessage = null,
                    Token = tokenString,
                    Permissions = GetPermissionsFromClaims(claims)
                };

                return Ok(loginResult);
            }
            if (user.UserName == "editor" && user.Password == "editor")
            {
                claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, "Editor")
                };

                tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:4200",
                    audience: "https://localhost:44361",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                loginResult = new LoginResult
                {
                    Success = true,
                    ErrorMessage = null,
                    Token = tokenString,
                    Permissions = GetPermissionsFromClaims(claims)
                };

                return Ok(loginResult);
            }
            if (user.UserName == "manager" && user.Password == "manager")
            {
                claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, "Manager")
                };

                tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:4200",
                    audience: "https://localhost:44361",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                loginResult = new LoginResult
                {
                    Success = true,
                    ErrorMessage = null,
                    Token = tokenString,
                    Permissions = GetPermissionsFromClaims(claims)
                };

                return Ok(loginResult);
            }
            if (user.UserName == "user" && user.Password == "user")
            {
                claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName)
                };

                tokeOptions = new JwtSecurityToken(
                    issuer: "http://localhost:4200",
                    audience: "https://localhost:44361",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signinCredentials
                );

                tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);

                loginResult = new LoginResult
                {
                    Success = true,
                    ErrorMessage = null,
                    Token = tokenString,
                    Permissions = GetPermissionsFromClaims(claims)
                };

                return Ok(loginResult);
            }

            loginResult = new LoginResult
            {
                Success = false,
                ErrorMessage = "Неверный логин или пароль (server)",
                Token = null,
                Permissions = null
            };

            return Ok(loginResult);
        }


        [HttpPost, Route("check-is-authenticated")]
        public IActionResult CheckIsAuthenticated([FromBody]object body)
        {
            return Ok(User.Identity.IsAuthenticated);
        }

        [HttpGet, Route("get-user-permissions"), Authorize]
        public async Task<UserPermissions> GetUserPermissions()
        {
            var claims = User.Claims.ToList();
            UserPermissions userPermissions = GetPermissionsFromClaims(claims);

            return userPermissions;
        }

        private UserPermissions GetPermissionsFromClaims(List<Claim> claims)
        {
            UserPermissions userPermissions = new UserPermissions();

            foreach (var claim in claims)
            {
                if (claim.Type == ClaimTypes.Role && claim.Value == "Manager")
                {
                    userPermissions.CanEditTags = true;
                    userPermissions.CanEditKeyWords = true;
                }
                if (claim.Type == ClaimTypes.Role && claim.Value == "Editor")
                {
                    userPermissions.CanEditArticles = true;
                    userPermissions.CanEditKeyWords = true;
                }
            }

            return userPermissions;
        }
    }
}
