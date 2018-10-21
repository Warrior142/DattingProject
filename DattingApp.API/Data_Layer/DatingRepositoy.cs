using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DattingApp.API.Dtos;
using DattingApp.API.Helpers;
using DattingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.API.Data_Layer {
    public class DatingRepositoy : IDatingRepositoy {
        private readonly DataContext _context;

        public DatingRepositoy (DataContext context) {
            _context = context;
        }
        public void Add<T> (T entity) where T : class {
            _context.Add (entity);
        }

        public void Delete<T> (T entity) where T : class {
            _context.Remove (entity);
        }

        public async Task<IEnumerable<UserForListDto>> GetUsers () {
            //  var users = await _context.tbl_users.Include (p => p.Photos).ToListAsync ();
            try {
                var result = await _context.tbl_users
                    .Select (k => new UserForListDto () {
                        Id = k.Id,
                            UserName = k.UserName,
                            Gender = k.Gender,
                            Age = Convert.ToDateTime (k.DateOfBirth).CalculateAge (),
                            KnownAs = k.KnownAs,
                            Created = k.Created,
                            LastActive = k.LastActive,
                            City = k.City,
                            Country = k.Country,
                            PhotoUrl = k.Photos.Select (p => p.Url).FirstOrDefault ()
                    }).ToListAsync ();

                return result;
            } catch (Exception error) {
                throw error;
            }

        }
        //UserForDetailsDto
        public async Task<UserForDetailsDto> GetUser (int id) {
            var user = await _context.tbl_users.Where (u => u.Id == id)
                .Select (k => new UserForDetailsDto {
                    Id = k.Id,
                        UserName = k.UserName,
                        Gender = k.Gender,
                        Age = Convert.ToDateTime (k.DateOfBirth).CalculateAge (),
                        KnownAs = k.KnownAs,
                        Created = k.Created,
                        LastActive = k.LastActive,
                        Introduction = k.Introduction,
                        LookingFor = k.LookingFor,
                        Interests = k.Interests,
                        City = k.City,
                        Country = k.Country,
                        PhotoUrl = k.Photos.Select (p => p.Url).FirstOrDefault (),
                        Photos = k.Photos.Select (p => new PhotosForDetailedDto {
                            Id = p.Id,
                                Url = p.Url,
                                Description = p.Description,
                                DateAdded = p.DateAdded,
                                IsMain = p.IsMain
                        }).ToList ()
                }).FirstOrDefaultAsync ();
            return user;
        }

        public async Task<bool> SaveAll () {
            return await _context.SaveChangesAsync () > 0;
        }
    }
}