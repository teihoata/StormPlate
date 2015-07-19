using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.Configuration;
using Microsoft.Framework.DependencyInjection;
using StormPlate.Core;

namespace StormPlate.DependencyInjection
{
    public class StartupManager
    {
        private IConfiguration configuration;

        IEnumerable<IStartup> startups;


        public StartupManager(IConfiguration configuration)
        {
            this.configuration = configuration;

            //TODO do type attribute discovery
            //startups.Add(new EntitryFrameworkDependencyStartup(configuration));
            //startups.Add(new ServicesStartup(configuration));
            //startups = loadFromAllAssembles();
            startups = hardcodedStartups();
        }

        private IEnumerable<IStartup> hardcodedStartups()
        {
            yield return new EntityFramework.EntityFrameworkStartup();
            yield return new WebApi.WebApiStartup();
        }


        //private IEnumerable<IStartup> loadFromAllAssembles()
        //{
        //   
        //  typeof(StartupManager).
        //   var types = Assembly.
        //           .SelectMany(a => 
        //                a.GetTypes().Where(t => Attribute.IsDefined(t, typeof(StartupAttribute))));
        //    //Filter here
        //
        //    //Order
        //    //types = types.OrderBy(t => t.att)
        //
        //   return types.Select(t => Activator.CreateInstance(t, configuration) as IStartup);
        //}


        public void ConfigureServices(IServiceCollection services)
        {
            foreach (var item in startups)
            {
                item.ConfigureServices(services);
            }
        }

        public void Configure(IApplicationBuilder app)
        {
            foreach (var item in startups)
            {
                item.Configure(app);
            }
        }

    }
}
