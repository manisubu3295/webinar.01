using Microsoft.EntityFrameworkCore;

namespace BillingApi.Models;

public class BillingDbContext : DbContext
{
    public BillingDbContext(DbContextOptions<BillingDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Invoice> Invoices => Set<Invoice>();
    public DbSet<BillNumberSequence> BillNumberSequences => Set<BillNumberSequence>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasKey(p => p.Code);
        modelBuilder.Entity<Customer>().HasKey(c => c.Id);
        modelBuilder.Entity<Customer>()
            .HasMany(c => c.SpecialPricing)
            .WithOne()
            .HasForeignKey(sp => sp.CustomerId);
        modelBuilder.Entity<Invoice>()
            .HasMany(i => i.Items)
            .WithOne()
            .HasForeignKey(li => li.InvoiceId);
    }
}
