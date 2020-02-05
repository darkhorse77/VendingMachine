using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VendingMachine.Models;

namespace VendingMachine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinksController : ControllerBase
    {
        private ApplicationContext db;
        public DrinksController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(db.Drinks.ToList());
        }

        [HttpPost]
        public IActionResult Post(Drink drink)
        {
            db.Drinks.Add(drink);
            db.SaveChanges();
            return Ok();
        }

        public IActionResult Put([FromBody]Drink drink)
        {
            if (db.Drinks.Where(x => x.Id == drink.Id) == null)
                return NotFound("Drink not found");
            db.Drinks.Update(drink);
            db.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            Drink drink = db.Drinks.Where(x => x.Id == id).FirstOrDefault();
            if (drink == null)
                return NotFound("Drink not found");
            db.Drinks.Remove(drink);
            db.SaveChanges();
            return Ok();
        }
    }
}