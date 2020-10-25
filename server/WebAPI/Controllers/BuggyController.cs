using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Domain.Entities;
using Repository;

namespace WebAPI.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _dataContext;
        public BuggyController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet("bad-request")]
        public ActionResult<AppUser> GetBadRequest()
        {
            return BadRequest();
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "Secret Text";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var thing = _dataContext.Users.Find(-1);

            if (thing == null) return NotFound();

            return Ok(thing);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var thing = _dataContext.Users.Find(-1);

            return thing.ToString();
        }
    }
}
