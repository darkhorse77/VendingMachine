using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace HelloAngularApp.Controllers
{
    [EnableCors("CorsPolicy")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}