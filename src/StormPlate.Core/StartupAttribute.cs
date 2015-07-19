using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StormPlate.Core
{
    [AttributeUsage(AttributeTargets.Class)]
    public class StartupAttribute : Attribute
    {
        public int LoadOrder { get; private set; }
        public StartupAttribute(int loadOrder)
        {
            LoadOrder = loadOrder;
        }
    }
}
