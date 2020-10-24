using AutoMapper;
using System.Linq;

using Domain.DTO;
using Domain.Entities;
using WebAPI.Extensions;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDTO>()
                .ForMember(
                    dest => dest.PhotoUrl,
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url)
                )
                .ForMember(
                    dest => dest.Age,
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge())
                );
            CreateMap<Photo, PhotoDTO>();
            CreateMap<RegisterDTO, AppUser>();
            CreateMap<MemberUpdateDTO, AppUser>();
        }
    }
}
