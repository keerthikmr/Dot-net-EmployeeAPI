namespace EmployeeAPI.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using EmployeeAPI.Configurations;
using Microsoft.Extensions.Options;
using EmployeeAPI.Models.DTOs;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

[ApiController]
[Route("api/[controller]")]
public class AuthController: ControllerBase
{
	private readonly ILogger<AuthController> _logger;
	private readonly UserManager<IdentityUser> _userManager;
	private readonly JwtConfig _jwtConfig; 

	public AuthController(ILogger<AuthController> logger, UserManager<IdentityUser> userManager, IOptionsMonitor<JwtConfig> _optionsMonitor)
	{
		_logger = logger;
		_userManager = userManager;
		_jwtConfig = _optionsMonitor.CurrentValue;
	}

    // ...

    [HttpPost]
    [Route("Register")]
    public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDTO requestDTO)
    {
        if (ModelState.IsValid)
        {
            var emailExist = await _userManager.FindByEmailAsync(requestDTO.Email);

            if (emailExist != null)
            {
                return BadRequest("Email already exists");
            }

            var newUser = new IdentityUser()
            {
                Email = requestDTO.Email,
                UserName = requestDTO.Email
            };

            var isCreated = await _userManager.CreateAsync(newUser, requestDTO.Password);

            if (isCreated.Succeeded)
            {
                var token = GenerateJwtToken(newUser);

                return Ok(new RegistrationRequestResponse()
                {
                    Result = true,
                    Token = token
                });


            }

            return BadRequest(isCreated.Errors.Select(x => x.Description).ToList());
        }

        

        return BadRequest("Invalid request payload");
    }

    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] UserLoginRequestDTO requestDTO)
    {
        if (ModelState.IsValid)
        {
            var existingUser = await _userManager.FindByEmailAsync(requestDTO.Email);

            if (existingUser == null)
            {
                return BadRequest("Invalid authentication");
            }

            var isPasswordValid = await _userManager.CheckPasswordAsync(existingUser, requestDTO.Password);

            if (isPasswordValid)
            {
                var token = GenerateJwtToken(existingUser);
                return Ok(new LoginRequestResponse
                {
                    Token = token,
                    Result = true
                });
            }

            return BadRequest("Invalid authentication");
        }

        return BadRequest("Invalid request");
    }

    private string GenerateJwtToken(IdentityUser user)
    {
        var jwtTokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id", user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(6),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        return jwtTokenHandler.WriteToken(token);
    }
}