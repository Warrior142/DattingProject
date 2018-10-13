using System.ComponentModel.DataAnnotations;

namespace DattingApp.API.Models
{
    public class tbl_employee
    {
         [Key]  
        public int EmployeeID { get; set; }    
       
     
        public string Name { get; set; } 
     
       
        public string Job { get; set; }   
    }
}