using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebProductsControl.Model;

namespace WebProductsControl.Config
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) :base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Product> Produto { get; set; }
    }
}
