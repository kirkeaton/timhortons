import { expect } from 'chai';
import timhortons from '../lib';

describe('Tim Hortons', () => {
   it('should return tim hortons stores given valid lat and lng', () => {
      return timhortons({
         latitude: 42.603187,
         longitude: -83.261646,
      }).then((result: any) => {
         expect(result).to.be.an('array').that.is.not.empty;
      });
   });

   it('should return tim hortons stores given valid radius, lat and lng', () => {
      return timhortons({
         radius: 10,
         latitude: 42.603187,
         longitude: -83.261646,
      }).then(result => {
         expect(result).to.be.an('array').that.is.not.empty;
      });
   });

   it('should throw error given missing params', () => {
      return timhortons()
         .then(() => {
            throw new Error('Should not return results with missing params');
         })
         .catch((err: any) => {
            expect(err.message).to.equal('Missing required parameter: params');
         });
   });

   it('should throw error given invalid radius', () => {
      return timhortons({
         radius: -1,
         latitude: 42.603187,
         longitude: -83.261646,
      })
         .then((result: any) => {
            throw new Error('Should not return results with invalid radius');
         })
         .catch((err: any) => {
            expect(err.message).to.equal(
               'Invalid parameter: radius must be greater than 0',
            );
         });
   });

   it('should throw error given missing latitude', () => {
      return timhortons({ longitude: -83.261646 })
         .then(() => {
            throw new Error('Should not return results with missing latitude');
         })
         .catch((err: any) => {
            expect(err.message).to.equal(
               'Missing required parameter: latitude',
            );
         });
   });

   it('should throw error given missing longitude', () => {
      return timhortons({ latitude: 42.603187 })
         .then(() => {
            throw new Error('Should not return results with missing longitude');
         })
         .catch((err: any) => {
            expect(err.message).to.equal(
               'Missing required parameter: longitude',
            );
         });
   });
});
