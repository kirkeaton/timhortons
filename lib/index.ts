import * as rp from 'request-promise';
import * as xml2js from 'xml2js';
import * as util from 'util';
import { IQueryParams, IStoreResponse } from './models';
import { StoreTransformer } from './transformers';

const uri = 'http://www.timhortons.com/ca/en/php/getRestaurants.php';
const parseString = util.promisify(xml2js.parseString);
const defaultTransformer = new StoreTransformer();

/**
 * Transforms XML response into array of stores
 *
 * @param {string} body XML Response from Tim Hortons API
 * @return {Promise<any>}
 */
async function transform(body: string): Promise<IStoreResponse[]> {
   return parseString(body).then(function(result: any) {
      // Check for xml tags markers and marker
      if (!result.markers && !result.markers.marker) {
         throw new Error('Error fetching stores');
      }

      // Extract stores from nested object
      return result.markers.marker.map((marker: any) => {
         return defaultTransformer.transform(marker.$);
      });
   });
}

/**
 * Fetches a list of Tim Hortons stores given a latitude and longitude
 *
 * @param {IQueryParams} params Search parameters
 * @return {Promise<any>}
 */
export default async function timhortons(params?: IQueryParams): Promise<any> {
   if (!params) {
      throw new Error('Missing required parameter: params');
   }

   const query = {
      units: 'km',
      rad: params.radius || 5,
      origlat: params.latitude,
      origlng: params.longitude,
   };

   // Radius must be greater than 0
   if (query.rad <= 0) {
      throw new Error('Invalid parameter: radius must be greater than 0');
   }
   // Latitude and longitude are both required
   if (!query.origlat) {
      throw new Error('Missing required parameter: latitude');
   }
   if (!query.origlng) {
      throw new Error('Missing required parameter: longitude');
   }

   return rp({
      uri: uri,
      qs: query,
      transform: transform,
   });
}
