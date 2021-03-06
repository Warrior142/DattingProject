using System;
using System.Threading.Tasks;
using DattingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.API.Data_Layer {
    public class AuthRepository : IAuthRepository {
        private readonly DataContext _context;
        public AuthRepository (DataContext context) {
            _context = context;
        }
        public async Task<Users> Login (string username, string password) {
            try {
                var user = await _context.tbl_users.FirstOrDefaultAsync (x => x.UserName == username);
                if (user == null)
                    return null;
                if (!VerifyPasswordHash (password, user.PasswordHash, user.PasswordSalt))
                    return null;

                //auth success
                return user;
            } catch (Exception e) {
                throw e;
            }
        }

        private bool VerifyPasswordHash (string password, byte[] passwordHash, byte[] passwordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 (passwordSalt)) {
                var computedHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
                for (int i = 0; i < computedHash.Length; i++) {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
                return true;
            }
        }

        public async Task<Users> Register (Users user, string password) {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash (password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _context.tbl_users.AddAsync (user);
            await _context.SaveChangesAsync ();
            return user;
        }

        private void CreatePasswordHash (string password, out byte[] passwordHash, out byte[] passwordSalt) {
            using (var hmac = new System.Security.Cryptography.HMACSHA512 ()) {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash (System.Text.Encoding.UTF8.GetBytes (password));
            }
        }

        public async Task<bool> UserExists (string username) {
            if (await _context.tbl_users.AnyAsync (x => x.UserName == username))
                return true;
            else
                return false;
        }
    }
}