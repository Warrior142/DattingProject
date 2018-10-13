using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DattingApp.API.Data_Layer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.API.Controllers {
    [Route ("api/[controller]/[Action]")]
    [ApiController]
    public class ValuesController : ControllerBase {
        private readonly DataContext _context;

        public ValuesController (DataContext context) {
            this._context = context;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> GetValues () {
            var values =await _context.tbl_employee.ToListAsync ();
            return Ok (values);
        }

        // GET api/values/GetValuesById/5
        [HttpGet]
        public async Task<IActionResult> GetValuesById (int id) {
            var values = await _context.tbl_employee.FirstOrDefaultAsync(x => x.EmployeeID == id);
            return Ok (values);
        }

        // POST api/values
        [HttpPost]
        public void Post ([FromBody] string value) { }

        // PUT api/values/5
        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) { }

        // DELETE api/values/5
        [HttpDelete ("{id}")]
        public void Delete (int id) { }
    }
}