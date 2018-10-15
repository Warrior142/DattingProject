using System.Threading.Tasks;
using DattingApp.API.Models;

namespace DattingApp.API.Data_Layer
{
    public interface IAuthRepository
    {
         Task<Users> Register(Users user,string password);
         Task<Users> Login(string username,string password);
         Task<bool> UserExists(string username);
    }  
}