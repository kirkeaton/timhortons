import * as rp from 'request-promise';
import * as xml2js from 'xml2js';
import * as util from 'util';

const uri = 'http://www.timhortons.com/ca/en/php/getRestaurants.php';
const parseString = util.promisify(xml2js.parseString);

/**
 * Transforms XML response into array of stores
 *
 * @param {string} body XML Response from Tim Hortons API
 * @return {Promise<any>}
 */
async function transform(body: string): Promise<any> {
   return parseString(body).then(function(result: any) {
      // Check for xml tags markers and marker
      if (!result.markers && !result.markers.marker) {
         throw new Error('Error fetching stores');
      }
      // Extract stores from nested object
      return result.markers.marker.map((marker: any) => {
         return marker.$;
      });
   });
}

/**
 * Fetches a list of Tim Hortons stores given a latitude and longitude
 *
 * @param {Object} options Search options
 * @param {Number} options.rad Search radius distance in KM
 * @param {Number} options.origlat Longitude
 * @param {Number} options.origlng Latitude
 * @return {Promise<any>}
 */
export default async function timhortons(options?: any): Promise<any> {
   if (!options) {
      throw new Error('Missing required parameter: options');
   }

   const query = {
      ...{
         units: 'km',
         rad: 5,
         origlat: undefined,
         origlng: undefined,
      },
      ...options,
   };

   // Radius must be greater than 0
   if (query.rad <= 0) {
      throw new Error('Invalid parameter: radius must be greater than 0');
   }
   // Latitude and longitude are both required
   if (!query.origlat) {
      throw new Error('Missing required parameter: origlat');
   }
   if (!query.origlng) {
      throw new Error('Missing required parameter: origlng');
   }

   return rp({
      uri: uri,
      qs: query,
      transform: transform,
   });
}
