using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Reflection.PortableExecutable;
using System.Text;

namespace EmployeeAPI.Controllers
{
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IConfiguration _configuration;

        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("get_all_employees")]

        public JsonResult get_all_employees()
        {
            string query = "select emp_no, first_name, last_name, gender, birth_date, hired_date, title_name from employee join titles on employee.title_id = titles.title_id;";
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
            string query = "select * from employee join titles on employee.title_id=titles.title_id where emp_no = @emp_no;";
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
        public JsonResult add_employee([FromForm] string first_name, [FromForm] string last_name, [FromForm] string gender, [FromForm] string birth_date, [FromForm] string hired_date, [FromForm] int title_id)
        {
            string query = "insert into employee values (@first_name, @last_name, @gender, @birth_date, @hired_date, @title_id)";
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

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }
            return new JsonResult("Added successfully");
        }

        [HttpPost("edit_employee")]
        public JsonResult edit_employee([FromForm] int emp_no, [FromForm] string first_name, [FromForm] string last_name, [FromForm] string gender, [FromForm] string birth_date, [FromForm] string hired_date)
        {
            string query = "UPDATE employee SET first_name=@first_name, last_name=@last_name, gender=@gender, birth_date=@birth_date, hired_date=@hired_date WHERE emp_no=@emp_no";
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

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }
            return new JsonResult("Edited successfully");
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
    }
}
