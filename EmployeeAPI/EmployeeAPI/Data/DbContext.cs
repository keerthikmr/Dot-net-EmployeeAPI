using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAPI.Data;


public class ApiDbContext: IdentityDbContext
{
    public ApiDbContext(DbContextOptions<ApiDbContext> options) : base (options)
    {

    }
}