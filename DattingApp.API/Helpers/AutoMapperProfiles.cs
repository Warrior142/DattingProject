using System.Linq;
using AutoMapper;
using DattingApp.API.Dtos;
using DattingApp.API.Models;

namespace DattingApp.API.Helpers {
    public class AutoMapperProfiles : Profile {
        public AutoMapperProfiles () {
            CreateMap<Users, UserForListDto> ();
            CreateMap<Users, UserForDetailsDto> ();
            CreateMap<Photo, PhotosForDetailedDto> ();
        }
    }
}