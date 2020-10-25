using System.Threading.Tasks;

using Domain.DTO;
using Domain.Entities;

namespace Repository.Interfaces
{
    public interface ILikeRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likedUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<LikeDTO>> GetUserLikesInfo(LikesParams likesParams);
    }
}
