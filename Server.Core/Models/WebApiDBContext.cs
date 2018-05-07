using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Server.Core.Models
{
    public partial class WebApiDBContext : DbContext
    {
        public WebApiDBContext(DbContextOptions options) : 
            base(options) { }

        public virtual DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:DefaultSchema", "guest");

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("Employee", "dbo");

                entity.Property(e => e.EmployeeID);

                entity.Property(e => e.EmpCode)
                    .HasMaxLength(50)
                    .IsUnicode(true);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(true);

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(true);

                entity.Property(e => e.Office)
                    .HasMaxLength(50)
                    .IsUnicode(true);

                entity.Property(e => e.Position)
                    .HasMaxLength(50)
                    .IsUnicode(true);
            });
        }
    }
}
