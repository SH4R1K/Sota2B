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
    public class EventsController : ControllerBase
    {
        private readonly Sota2BContext _context;
        private readonly IConverter<Event, EventDetailsDto> _eventConverterDto;

        public EventsController(Sota2BContext context, IConverter<Event, EventDetailsDto> eventConverterDto)
        {
            _context = context;
            _eventConverterDto = eventConverterDto;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            return await _context.Events.Include(e => e.Achievement).ToListAsync();
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventDetailsDto>> GetEvent(int id)
        {
            var @event = await _context.Events.Include(e => e.UserWasOnEvent).ThenInclude(e => e.User).Include(e => e.Achievement).FirstOrDefaultAsync(e => e.Id == id);

            if (@event == null)
            {
                return NotFound();
            }

            return _eventConverterDto.Convert(@event);
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event @event)
        {
            if (id != @event.Id)
            {
                return BadRequest();
            }

            // Загрузка существующего события из базы данных
            var existingEvent = await _context.Events
                .Include(e => e.Achievement) // Включаем Achievement
                .FirstOrDefaultAsync(e => e.Id == id);

            if (existingEvent == null)
            {
                return NotFound();
            }

            if (@event.StartDate > @event.EndDate)
                return BadRequest("Дата начала не может быть позже даты окончания");
            // Обновление свойств события
            existingEvent.Name = @event.Name;
            existingEvent.Description = @event.Description;
            existingEvent.Reward = @event.Reward;
            existingEvent.StartDate = @event.StartDate;
            existingEvent.EndDate = @event.EndDate;

            // Обновление Achievement, если он не равен null
            if (@event.Achievement != null)
            {
                if (existingEvent.Achievement == null)
                {
                    existingEvent.Achievement = new Achievement(); // Создаем новый Achievement, если его нет
                }

                // Обновляем свойства Achievement
                existingEvent.Achievement.Name = @event.Achievement.Name; 
                existingEvent.Achievement.Description = @event.Achievement.Description; 
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
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

        [HttpPatch("users/{id}")]
        public async Task<IActionResult> PatchEvent(int id, int[] userIds)
        {
            var eventEntity = await _context.Events
                .Include(e => e.UserWasOnEvent)
                .Include(e => e.Achievement)
                    .ThenInclude(a => a.UserHasAchievment)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (eventEntity == null)
            {
                return NotFound();
            }

            var currentUserIds = eventEntity.UserWasOnEvent.Select(u => u.IdUser).ToList();

            var usersToAdd = userIds.Except(currentUserIds)
                .Select(userId => new UserWasOnEvent { IdEvent = id, IdUser = userId, Points = eventEntity.Reward })
                .ToList();
            
            _context.UserWasOnEvents.AddRange(usersToAdd);

            var usersToRemove = eventEntity.UserWasOnEvent
                .Where(u => !userIds.Contains(u.IdUser))
                .ToList();

            _context.UserWasOnEvents.RemoveRange(usersToRemove);

            if (eventEntity.Achievement != null)
            {
                var achievementId = eventEntity.Achievement.Id;

                var achievementsToRemove = _context.UserHasAchievements
                    .Where(ua => ua.IdAchievment == achievementId && usersToRemove.Select(u => u.IdUser).Contains(ua.IdUser))
                    .ToList();

                _context.UserHasAchievements.RemoveRange(achievementsToRemove);

                var existingAchievers = _context.UserHasAchievements
                    .Where(ua => ua.IdAchievment == achievementId && userIds.Contains(ua.IdUser))
                    .Select(ua => ua.IdUser)
                    .ToList();

                var achievementsToAdd = usersToAdd
                    .Where(u => !existingAchievers.Contains(u.IdUser))
                    .Select(u => new UserHasAchievement { IdUser = u.IdUser, IdAchievment = achievementId })
                    .ToList();

                _context.UserHasAchievements.AddRange(achievementsToAdd);
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }




        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event @event)
        {
            if (@event.StartDate > @event.EndDate)
                return BadRequest("Дата начала не может быть позже даты окончания");

            _context.Events.Add(@event);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = @event.Id }, @event);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var @event = await _context.Events.FindAsync(id);
            if (@event == null)
            {
                return NotFound();
            }

            _context.Events.Remove(@event);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}
