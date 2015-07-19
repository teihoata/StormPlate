
//using Microsoft.AspNet.Builder;

using Microsoft.AspNet.Builder;
using Microsoft.Framework.DependencyInjection;

namespace StormPlate.Core
{
    public interface IStartup
    {
        void ConfigureServices(IServiceCollection services);
        void Configure(IApplicationBuilder app);
       
    }
}
