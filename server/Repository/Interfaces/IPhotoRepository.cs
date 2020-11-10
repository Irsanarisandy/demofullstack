using System.Collections.Generic;
using System.Threading.Tasks;

using Domain.DTO;
using Domain.Entities;

namespace Repository.Interfaces
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<PhotoForApprovalDTO>> GetUnapprovedPhotos();
        Task<Photo> GetPhotoById(int id);
        void RemovePhoto(Photo photo);
    }
}
