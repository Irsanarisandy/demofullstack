using Domain.Entities;

namespace Service.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
