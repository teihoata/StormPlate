using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;
using StormPlate.Core;
//using Swashbuckle.Swagger;

namespace StormPlate.WebApi
{
    public class WebApiStartup : IStartup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddSwagger(c =>
            //{
            //    c.SwaggerGeneratorOptions.Schemes = new[] { "http", "https" };
            //    c.SwaggerGeneratorOptions.SingleApiVersion(new Info
            //    {
            //        Version = "v2",
            //        Title = "StormPlateWebApi", //NO SPACES
            //        Description = "A sample API for testing Swashbuckle",
            //        TermsOfService = "Some terms ..."
            //    });
            //    //c.SwaggerGeneratorOptions.OperationFilter<AssignOperationVendorExtensions>();
            //
            //    c.SchemaGeneratorOptions.DescribeAllEnumsAsStrings = true;
            //});
        }
        public void Configure(IApplicationBuilder app)
        {

            //app.UseSwagger();
            //app.UseSwaggerUi();
        }

    }
}
