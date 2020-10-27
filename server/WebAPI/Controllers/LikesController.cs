using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

using Domain.DTO;
using Domain.Entities;
using Repository.Interfaces;
using WebAPI.Extensions;

namespace WebAPI.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly ILikeRepository _likeRepository;
        private readonly IUserRepository _userRepository;

        public LikesController(ILikeRepository likeRepository, IUserRepository userRepository)
        {
            _userRepository = userRepository;
            _likeRepository = likeRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult<bool>> ToggleLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _likeRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You can't like yourself in this app");

            var userLike = await _likeRepository.GetUserLike(sourceUserId, likedUser.Id);

            var isLiked = true;
            if (userLike != null)
            {
                sourceUser.LikedUsers.Remove(userLike);
                isLiked = false;
            }
            else
            {
                userLike = new UserLike
                {
                    SourceUserId = sourceUserId,
                    LikedUserId = likedUser.Id
                };

                sourceUser.LikedUsers.Add(userLike);
            }

            if (await _userRepository.SaveAllAsync()) return Ok(isLiked);

            return BadRequest("Failed to like user");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDTO>>> GetUserLikesInfo([FromQuery] LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
            var users = await _likeRepository.GetUserLikesInfo(likesParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalItems, users.TotalPages);

            return Ok(users);
        }
    }
}
