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
    public class CoinsController : ControllerBase
    {
        private ApplicationContext db;
        public CoinsController(ApplicationContext context)
        {
            db = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(db.Coins.ToList());
        }

        [HttpPut]
        public IActionResult Put(Coin coin)
        {
            if (db.Coins.Where(x => x.Id == coin.Id) == null)
                return NotFound("Coin not found");
            db.Coins.Update(coin);
            db.SaveChanges();
            return Ok();
        }
    }
}