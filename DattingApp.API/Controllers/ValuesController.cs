using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DattingApp.API.Data_Layer;
using DattingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.API.Controllers {
    [Authorize]
    [Route ("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase {
        private readonly DataContext _context;

        public ValuesController (DataContext context) {
            this._context = context;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> GetValues () {
            var values = await _context.tbl_employee.ToListAsync ();
            return Ok (values);
        }

        // GET api/values/GetValuesById
        [HttpGet ("{id}")]
        public async Task<IActionResult> GetValuesById (int id) {
            var values = await _context.tbl_employee.FirstOrDefaultAsync (x => x.EmployeeID == id);
            return Ok (values);
        }

        // DELETE api/values/deleteEmployee/5
        [HttpDelete ("{id}")]
        public async Task<IActionResult> deleteEmployee (int id) {
            var res = await _context.tbl_employee.FirstOrDefaultAsync (x => x.EmployeeID == id);
            if (res == null) {
                return NotFound ();
            }
            _context.tbl_employee.Remove (res);
            await _context.SaveChangesAsync ();
            return Ok (new { message = "deleted successfully" });
        }

        [HttpPut]
        public async Task<IActionResult> UpdateEmployees ([FromBody] tbl_employee model) {
            if (model == null) {
                return BadRequest ();
            }
            var res = await _context.tbl_employee.FirstOrDefaultAsync (x => x.EmployeeID == model.EmployeeID);
            if (res == null) {
                return NotFound ();
            }
            res.Name = model.Name;
            res.Job = model.Job;
            await _context.SaveChangesAsync ();
            return Ok (new { message = "updated successfully" });
        }

        // POST api/values/PostEmployees
        [HttpPost]
        public async Task<IActionResult> PostEmployees ([FromBody] tbl_employee model) {
            if (model == null) {
                return BadRequest ();
            }
            _context.tbl_employee.Add (model);
            await _context.SaveChangesAsync ();
            return Ok (new { message = "saved successfully" });
        }

    }
}