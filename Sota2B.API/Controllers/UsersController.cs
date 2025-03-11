using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sota2B.API.Converters;
using Sota2B.API.Dto;
using Sota2B.DAL.Data;
using Sota2B.DM.Models;

namespace Sota2B.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly Sota2BContext _context;
        private readonly IConverter<User, UserDto> _userConverterDto;
        private readonly IConverter<User, UserDetailsDto> _userConverterDetailsDto;
        private readonly IConverter<User, UserRankedDto> _userConverterRankedDto;
        private readonly IConverter<Purchase, PurchaseDto> _purchaseConverterDto;
        private readonly IConverter<Achievement, AchievementDto> _achievementConverterDto;

        public UsersController(Sota2BContext context, IConverter<User, UserDto> userConverterDto, IConverter<Purchase, PurchaseDto> purchaseConverterDto, IConverter<Achievement, AchievementDto> achievementConverterDto, IConverter<User, UserDetailsDto> userConverterDetailsDto, IConverter<User, UserRankedDto> userConverterRankedDto)
        {
            _context = context;
            _userConverterDto = userConverterDto;
            _purchaseConverterDto = purchaseConverterDto;
            _achievementConverterDto = achievementConverterDto;
            _userConverterDetailsDto = userConverterDetailsDto;
            _userConverterRankedDto = userConverterRankedDto;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            return _context.Users
                .Include(u => u.UserWasOnEvent)
                    .ThenInclude(u => u.Event)
                .Include(u => u.Purchases)
                .Select(_userConverterDto.Convert)
                .ToList();
        }

        [HttpGet("rating")]
        public async Task<ActionResult<IEnumerable<UserRankedDto>>> GetUsersRating()
        {
            return _context.Users
                .Include(u => u.UserWasOnEvent)
                    .ThenInclude(u => u.Event)
                .Select(_userConverterRankedDto.Convert)
                .OrderByDescending(u => u.Points)
                .ToList();
        }

        // GET: api/Users/5
        [HttpGet("events/{id}")]
        public async Task<ActionResult<IEnumerable<Event>>> GetUserEvents(int id)
        {
            var events = await _context.UserWasOnEvents
                .Include(u => u.Event)
                .Where(u => u.IdUser == id)
                .Select(u => u.Event).ToListAsync();

            return events;
        }

        [HttpPost("events/{id}/{eventId}")]
        public async Task<ActionResult<UserWasOnEvent>> AddUserEvent(int id, int eventId)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            var existEvent = await _context.Events.Include(e => e.Achievement).FirstOrDefaultAsync(e => e.Id == eventId);
            if (existEvent == null) return NotFound();

            if (await _context.UserWasOnEvents.AnyAsync(u => u.IdUser == id && u.IdEvent == eventId))
                return Conflict("Пользователь уже привязан к событию");

            if (existEvent.Achievement != null)
                user.UserHasAchievments.Add(new UserHasAchievement { IdUser = id, IdAchievment = existEvent.Achievement.Id });

            var wasonevent = new UserWasOnEvent { IdUser = id, IdEvent = eventId, Points = existEvent.Reward };
            await _context.UserWasOnEvents.AddAsync(wasonevent);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(AddUserEvent), wasonevent);
        }


        [HttpDelete("events/{id}/{eventId}")]
        public async Task<ActionResult> RemoveUserEvent(int id, int eventId)
        {
            var user = await _context.Users
                .Include(u => u.UserWasOnEvent)
                .Include(u => u.UserHasAchievments)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            var existEvent = await _context.Events
                .Include(e => e.Achievement)
                .FirstOrDefaultAsync(e => e.Id == eventId);

            if (existEvent == null)
            {
                return NotFound();
            }

            if (existEvent.Achievement != null)
            {
                var achievementToRemove = user.UserHasAchievments
                    .FirstOrDefault(u => u.IdAchievment == existEvent.Achievement.Id);

                if (achievementToRemove != null)
                {
                    user.UserHasAchievments.Remove(achievementToRemove);
                }
            }

            var eventToRemove = user.UserWasOnEvent
                .FirstOrDefault(u => u.IdEvent == eventId);

            if (eventToRemove != null)
            {
                user.UserWasOnEvent.Remove(eventToRemove);
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }


        [HttpGet("achievements/{id}")]
        public async Task<ActionResult<IEnumerable<AchievementDto>>> GetUserAchievements(int id)
        {
            var achievements = await _context.UserHasAchievements
                .Include(u => u.Achievement)
                    .ThenInclude(u => u.Event)
                .Where(u => u.IdUser == id)
                .Select(u => _achievementConverterDto.Convert(u.Achievement)).ToListAsync();

            return achievements;
        }
        [HttpPost("achievements/{id}/{achievementId}")]
        public async Task<ActionResult<UserHasAchievement>> AddUserAchievment(int id, int achievementId)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var achievment = await _context.Achievements.FindAsync(achievementId);

            if (achievment == null)
            {
                return NotFound();
            }
            var hasachievment = new UserHasAchievement { IdUser = id, IdAchievment = achievementId };

            await _context.UserHasAchievements.AddAsync(hasachievment);
            await _context.SaveChangesAsync();
            return CreatedAtAction("AddUserAchievment", hasachievment);
        }

        [HttpGet("purchases/{id}")]
        public async Task<ActionResult<IEnumerable<PurchaseDto>>> GetUserPurchases(int id)
        {
            var purchases = _context.Purchases
                .Include(u => u.Product)
                .Where(u => u.IdUser == id)
                .Select(_purchaseConverterDto.Convert)
                .ToList();

            return purchases;
        }
        [HttpPost("purchases/{id}/{productId}")]
        public async Task<ActionResult<Purchase>> AddUserPurchase(int id, int productId)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var product = await _context.Products.FindAsync(productId);

            if (product == null)
            {
                return NotFound();
            }
            var purchase = new Purchase { IdUser = id, Product = product, Price = product.Price, PurchaseDate = DateTime.Now };

            await _context.Purchases.AddAsync(purchase);
            await _context.SaveChangesAsync();
            return CreatedAtAction("AddUserPurchase", _purchaseConverterDto.Convert(purchase));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDetailsDto>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.UserHasAchievments)
                    .ThenInclude(u => u.Achievement)
                .Include(u => u.UserWasOnEvent)
                    .ThenInclude(u => u.Event)
                .Include(u => u.Purchases)
                    .ThenInclude(u => u.Product)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return _userConverterDetailsDto.Convert(user);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
