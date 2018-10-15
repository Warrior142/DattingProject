using DattingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.API.Data_Layer {
    public class DataContext : DbContext {
        public DataContext (DbContextOptions<DataContext> options) : base (options) { }

        public DbSet<tbl_employee> tbl_employee { get; set; }

         public DbSet<Users> tbl_users { get; set; }
    }
}