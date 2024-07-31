using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fieryLotos.Adapters.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        [Route("list")]
        [HttpGet, Authorize(Roles = "Editor")]
        public IEnumerable<string> GetArticlesList()
        {
            return new string[] { "Article 1", "Article 2" };
        }

        [Route("tags")]
        [HttpGet, Authorize(Roles = "Manager")]
        public IEnumerable<string> GetTags()
        {
            return new string[] { "Tag 1", "Tag 2" };
        }

        [Route("key-words")]
        [HttpGet, Authorize(Roles = "Manager, Editor")]
        public IEnumerable<string> GetKeyWords()
        {
            return new string[] { "Keyword 1", "Keyword 2" };
        }

        [Route("comments")]
        [HttpGet, Authorize]
        public IEnumerable<string> GetComments()
        {
            return new string[] { "Comment 1", "Comment 2" };
        }

        [Route("categories")]
        [HttpGet]
        public IEnumerable<string> GetArticlesCategories()
        {
            return new string[] { "Category 1", "Category 2", "Category 2" };
        }
    }
}
