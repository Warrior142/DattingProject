using System.Collections.Generic;
using System.Threading.Tasks;
using DattingApp.API.Dtos;
using DattingApp.API.Models;

namespace DattingApp.API.Data_Layer {
    public interface IDatingRepositoy {
        void Add<T> (T entity) where T : class;
        void Delete<T> (T entity) where T : class;
        Task<bool> SaveAll ();
        Task<IEnumerable<UserForListDto>> GetUsers ();
        Task<UserForDetailsDto> GetUser (int id);       

    }
}