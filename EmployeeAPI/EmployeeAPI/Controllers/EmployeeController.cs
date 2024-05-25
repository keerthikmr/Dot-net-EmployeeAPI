﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

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
            string query = "select * from employee";
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

        [HttpPost("add_employee")]

        public JsonResult add_employee([FromForm] string first_name, [FromForm] string last_name, [FromForm] string birth_date, [FromForm] string gender, [FromForm] string hired_date)
        {

            string query = "insert into employee values (@first_name, @last_name, @gender, @birth_date, @hired_date)";
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
                    myCommand.Parameters.AddWithValue("@birth_date", birth_date);
                    myCommand.Parameters.AddWithValue("@hired_date", hired_date);
                    myCommand.Parameters.AddWithValue("@gender", gender);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                }
            }
            return new JsonResult("Added successfully");
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
    }
}
