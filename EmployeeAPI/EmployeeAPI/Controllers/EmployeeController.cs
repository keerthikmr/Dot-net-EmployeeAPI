using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Reflection.PortableExecutable;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class EmployeeController : ControllerBase
    {
        private IConfiguration _configuration;
        private ILogger<EmployeeController> _logger;
        public EmployeeController(IConfiguration configuration, ILogger<EmployeeController> logger)
        {
            _configuration = configuration;
        }
        [HttpGet("get_all_employees")]

        public JsonResult get_all_employees()
        {
            string query = "select emp_no, first_name, last_name, gender, birth_date, hired_date, title_name, salary from employee left join titles on employee.title_id = titles.title_id;";
            DataTable table = new DataTable();

            string dataSource = _configuration.GetConnectionString("employee");
            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(dataSource))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    reader = command.ExecuteReader();
                    table.Load(reader);
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("get_employee/{emp_no}")]
        public JsonResult get_employee(int emp_no)
        {
            string query = "select * from employee left join titles on employee.title_id=titles.title_id where emp_no = @emp_no;";
            DataTable table = new DataTable();

            string dataSource = _configuration.GetConnectionString("employee");
            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(dataSource))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@emp_no", emp_no);
                    reader = command.ExecuteReader();
                    table.Load(reader);
                }
            }
            
            return new JsonResult(table);
        }

        [HttpPost("add_employee")]
        public JsonResult add_employee([FromForm] string first_name, [FromForm] string last_name, [FromForm] string gender, [FromForm] string birth_date, [FromForm] string hired_date, [FromForm] int title_id, [FromForm] int base_salary, [FromForm] string sal_operation, [FromForm] int salary_modifier)
        {
            int salary;

            if (String.Equals(sal_operation, '+'))
            {
                salary = base_salary + salary_modifier;
            } else
            {
                salary = base_salary - salary_modifier;
            }


            string query = "insert into employee values (@first_name, @last_name, @gender, @birth_date, @hired_date, @title_id, @salary)";
            DataTable table = new DataTable();

            string SqlDatasource = _configuration.GetConnectionString("employee");
            SqlDataReader myReader;

            using (SqlConnection mycon = new SqlConnection(SqlDatasource))
            {

                mycon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@first_name", first_name);
                    myCommand.Parameters.AddWithValue("@last_name", last_name);
                    myCommand.Parameters.AddWithValue("@gender", gender);
                    myCommand.Parameters.AddWithValue("@birth_date", birth_date);
                    myCommand.Parameters.AddWithValue("@hired_date", hired_date);
                    myCommand.Parameters.AddWithValue("@title_id", title_id);
                    myCommand.Parameters.AddWithValue("@salary", salary);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }
            return new JsonResult("Added successfully");
        }

        [HttpPost("edit_employee")]
        public JsonResult edit_employee([FromForm] int emp_no, [FromForm] string first_name, [FromForm] string last_name, [FromForm] string gender, [FromForm] string birth_date, [FromForm] string hired_date, [FromForm] string title_id, [FromForm] int salary)
        {
            string query = "UPDATE employee SET first_name=@first_name, last_name=@last_name, gender=@gender, birth_date=@birth_date, hired_date=@hired_date, title_id=@title_id, salary=@salary WHERE emp_no=@emp_no";
            DataTable table = new DataTable();

            string SqlDatasource = _configuration.GetConnectionString("employee");
            SqlDataReader myReader;

            using (SqlConnection mycon = new SqlConnection(SqlDatasource))
            {

                mycon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@emp_no", emp_no);
                    myCommand.Parameters.AddWithValue("@first_name", first_name);
                    myCommand.Parameters.AddWithValue("@last_name", last_name);
                    myCommand.Parameters.AddWithValue("@gender", gender);
                    myCommand.Parameters.AddWithValue("@birth_date", birth_date);
                    myCommand.Parameters.AddWithValue("@hired_date", hired_date);
                    myCommand.Parameters.AddWithValue("@salary", salary);
                    myCommand.Parameters.AddWithValue("@title_id", title_id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }
            return new JsonResult("Edited successfully");
        }

        [HttpPost("edit_title")]
        public JsonResult edit_title([FromForm] int title_id, [FromForm] string title_name, [FromForm] int base_salary, [FromForm] int dept_no)
        {
            string query = "UPDATE titles SET title_name=@title_name, base_salary=@base_salary, dept_no=@dept_no WHERE title_id=@title_id";
            DataTable table = new DataTable();

            string SqlDatasource = _configuration.GetConnectionString("employee");
            SqlDataReader myReader;

            using (SqlConnection mycon = new SqlConnection(SqlDatasource))
            {

                mycon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@title_id", title_id);
                    myCommand.Parameters.AddWithValue("@title_name", title_name);
                    myCommand.Parameters.AddWithValue("@base_salary", base_salary);
                    myCommand.Parameters.AddWithValue("@dept_no", dept_no);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }
            return new JsonResult("Title edited successfully");
        }


        [HttpPost("delete_employee/")]
        public async Task<IActionResult> DeleteEmployee()
        {
            using (StreamReader Preader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                string content = await Preader.ReadToEndAsync();
                int emp_no = int.Parse(content);
            

                string query = "DELETE FROM employee WHERE emp_no=@emp_no";
                DataTable table = new DataTable();

                string dataSource = _configuration.GetConnectionString("employee");
                SqlDataReader reader;

                using (SqlConnection connection = new SqlConnection(dataSource))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@emp_no", emp_no);
                        reader = command.ExecuteReader();
                        table.Load(reader);
                    }
                }
            }

            return new JsonResult("Deleted Successfully");
        }


        [HttpGet("get_all_dept")]

        public JsonResult get_all_dept()
        {
            string query = "select * from dept";
            DataTable table = new DataTable();

            string dataSource = _configuration.GetConnectionString("employee");
            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(dataSource))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    reader = command.ExecuteReader();
                    table.Load(reader);
                }
            }
            return new JsonResult(table);
        }

        [HttpGet("get_dept_titles/{dept_no}")]
        public JsonResult get_dept_titles(int dept_no)
        {
            string query = "select * from titles where dept_no=@dept_no";
            DataTable table = new DataTable();

            string dataSource = _configuration.GetConnectionString("employee");
            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(dataSource))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@dept_no", dept_no);
                    reader = command.ExecuteReader();
                    table.Load(reader);
                }
            }
            return new JsonResult(table);
        }


        [HttpPost("add_dept")]
        public JsonResult add_dept([FromForm] string dept)
        {

            string query = "insert into dept values (@dept)";
            DataTable table = new DataTable();

            string SqlDatasource = _configuration.GetConnectionString("employee");
            SqlDataReader myReader;

            using (SqlConnection mycon = new SqlConnection(SqlDatasource))
            {
                mycon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@dept", dept);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }
            return new JsonResult("Added successfully");
        }


        [HttpPost("delete_dept/")]
        public async Task<IActionResult> DeleteDept()
        {
            using (StreamReader Preader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                string content = await Preader.ReadToEndAsync();
                int dept_no = int.Parse(content);


                string query = "DELETE FROM dept WHERE dept_no=@dept_no";
                DataTable table = new DataTable();

                string dataSource = _configuration.GetConnectionString("employee");
                SqlDataReader reader;

                using (SqlConnection connection = new SqlConnection(dataSource))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@dept_no", dept_no);
                        reader = command.ExecuteReader();
                        table.Load(reader);
                    }
                }
            }

            return new JsonResult("Department deleted Successfully");
        }

        [HttpGet("get_all_titles")]

        public JsonResult get_all_titles()
        {
            string query = "select * from titles";
            DataTable table = new DataTable();

            string dataSource = _configuration.GetConnectionString("employee");
            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(dataSource))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    reader = command.ExecuteReader();
                    table.Load(reader);
                }
            }
            return new JsonResult(table);
        }


        [HttpGet("get_title/{title_id}")]
        public JsonResult get_title(int title_id)
        {
            string query = "select * from titles where title_id=@title_id;";
            DataTable table = new DataTable();

            string dataSource = _configuration.GetConnectionString("employee");
            SqlDataReader reader;

            using (SqlConnection connection = new SqlConnection(dataSource))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@title_id", title_id);
                    reader = command.ExecuteReader();
                    table.Load(reader);
                }
            }

            return new JsonResult(table);
        }


        [HttpPost("add_title")]

        public JsonResult add_title([FromForm] int dept_no, [FromForm] string title_name, [FromForm] int base_salary)
        {

            string query = "insert into titles values (@title_name, @dept_no, @base_salary)";
            DataTable table = new DataTable();

            string SqlDatasource = _configuration.GetConnectionString("employee");
            SqlDataReader myReader;

            using (SqlConnection mycon = new SqlConnection(SqlDatasource))
            {
                mycon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, mycon))
                {
                    myCommand.Parameters.AddWithValue("@dept_no", dept_no);
                    myCommand.Parameters.AddWithValue("@title_name", title_name);
                    myCommand.Parameters.AddWithValue("@base_salary", base_salary);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }
            return new JsonResult("Title added successfully");
        }

        [HttpPost("delete_title/")]
        public async Task<IActionResult> TitleEmployee()
        {
            using (StreamReader Preader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                string content = await Preader.ReadToEndAsync();
                int title_id = int.Parse(content);


                string query = "DELETE FROM titles WHERE title_id=@title_id";
                DataTable table = new DataTable();

                string dataSource = _configuration.GetConnectionString("employee");
                SqlDataReader reader;

                using (SqlConnection connection = new SqlConnection(dataSource))
                {
                    connection.Open();

                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@title_id", title_id);
                        reader = command.ExecuteReader();
                        table.Load(reader);
                    }
                }
            }

            return new JsonResult("Title deleted Successfully");
        }


        [HttpGet("authenticate")]
        public JsonResult Authenticate()
        {
            string query = "select * from credentials";
            DataTable table = new DataTable();

            string SqlDatasource = _configuration.GetConnectionString("employee");
            SqlDataReader myReader;

            using (SqlConnection mycon = new SqlConnection(SqlDatasource))
            {
                mycon.Open();

                using (SqlCommand myCommand = new SqlCommand(query, mycon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }

            System.Diagnostics.Debug.WriteLine(table);

            return new JsonResult(table);
        }


        [HttpGet("get_employee_image/{emp_no}")]
        public async Task<IActionResult> GetEmployeeImage(int emp_no)
        {
            string query = "SELECT image FROM employee WHERE emp_no = @emp_no";
            byte[] imageBytes = null;

            string dataSource = _configuration.GetConnectionString("employee");

            using (SqlConnection connection = new SqlConnection(dataSource))
            {
                connection.Open();

                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@emp_no", emp_no);
                    var result = await command.ExecuteScalarAsync();
                    if (result != DBNull.Value)
                    {
                        imageBytes = (byte[])result;
                    }
                }
            }

            if (imageBytes != null)
            {
                return File(imageBytes, "image/jpeg");
            }
            else
            {
                return NotFound();
            }
        }

    }
}
