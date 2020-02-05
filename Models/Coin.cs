using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VendingMachine.Models
{
    public class Coin
    {
        public int Id { get; set; }
        public int Value { get; set; } // номинал
        public int Count { get; set; }
        public bool IsActive { get; set; }
    }
}
