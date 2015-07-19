using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Configuration;
using Microsoft.Framework.Runtime;


namespace StormPlate
{
    public class Startup
    {
        public IConfiguration Configuration { get; set; }
        DependencyInjection.StartupManager startUpManager { get; set; }
        public Startup(IHostingEnvironment env, IApplicationEnvironment app)
        {
            var path = app.ApplicationBasePath;
            var configuration = new ConfigurationBuilder(path)
              .AddJsonFile($"{path}\\Config.json")
              .AddJsonFile($"{path}\\config.{env.EnvironmentName}.json", optional: true);

            if (env.IsEnvironment("Development"))
            {
                // This reads the configuration keys from the secret store.
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                //configuration.AddUserSecrets();
            }
            configuration.AddEnvironmentVariables();
            Configuration = configuration.Build();

            startUpManager = new DependencyInjection.StartupManager(Configuration);
        }

        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            //startUpManager.ConfigureServices(services);
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseStaticFiles();

            startUpManager.Configure(app);

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id?}",
                    defaults: new { controller = "Home", action = "Index" });

                // Uncomment the following line to add a route for porting Web API 2 controllers.
                // routes.MapWebApiRoute("DefaultApi", "api/{controller}/{id?}");
            });
        }
    }
}
