using MyMapApi;
using MyMapApi.Interfaces;
using MyMapApi.Services;
using Microsoft.EntityFrameworkCore;
using MyMapApi.Data;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Servislerin eklenmesi
builder.Services.AddControllers();


// DbContext için AppDbContext servisinin eklenmesi
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Cors politikasının eklenmesi
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", builder =>
    {
        builder.WithOrigins("http://127.0.0.1:5500") // Frontend URL'si
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Swagger'ın eklenmesi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Geliştirme ortamında Swagger'ı etkinleştirme
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Cors politikasının kullanılması
app.UseCors("MyCorsPolicy");

// Kimlik doğrulama ve yetkilendirme eklenmesi (gerekiyorsa)
// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

app.Run();
