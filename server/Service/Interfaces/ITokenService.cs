using System.Threading.Tasks;

using Domain.Entities;

namespace Service.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}
