// Leo Added
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

using Newtonsoft.Json.Linq;
using System.Net.Http;
using Microsoft.Extensions.Configuration;

namespace LeoPortal2.Services
{
    public class CoordService
    {
        private string bingKey;
        private HttpClient client;

        //private HttpClient client;
        private string confidence;
        private JToken coords;
        private string encodedName;
        private string json;
        private JToken resources;
        private CoordServiceResult result;
        private JObject results;
        private string url;
        private IConfigurationRoot _config;
        private ILogger<CoordService> _logger;

        public CoordService(ILogger<CoordService> logger, IConfigurationRoot config)
        {
            _logger = logger;
            _config = config;
        }

        public async Task<CoordServiceResult> GetCoordsAsync(string location)
        {
            result = new CoordServiceResult()
            {
                Success = false,
                Message = "Undetermined failure while looking up coordinates"
            };

            // lookup Coordinates
            encodedName = WebUtility.UrlEncode(location);
            bingKey = _config["AppSettings:BingKey"];
            url = $"https://dev.virtualearth.net/REST/v1/Locations?q={encodedName}&key={bingKey}";
            client = new HttpClient();

            json = await client.GetStringAsync(url);

            results = JObject.Parse(json);
            resources = results["resourceSets"][0]["resources"];
            if(!resources.HasValues)
            {
                result.Message = $"Could not find '{location}' as a location";
            }
            else
            {
                confidence = (string)resources[0]["confidence"];
                if (confidence != "High")
                {
                    result.Message = $"Cound not find a confident match for '{location}' as a location";
                }
                else
                {
                    coords = resources[0]["geocodePoints"][0]["coordinates"];
                    result.Latitude = (double)coords[0];
                    result.Longitude = (double)coords[1];
                    result.Success = true;
                    result.Message = "Success";
                }

            }


            return result;
        }
    }
}
