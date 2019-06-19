import { expect } from 'chai';
import timhortons from '../lib';

describe('Tim Hortons', () => {
   it('should return tim hortons stores given valid lat and lng', () => {
      return timhortons({
         origlat: 42.603187,
         origlng: -83.261646,
      }).then((result: any) => {
         expect(result).to.be.an('array').that.is.not.empty;
      });
   });

   it('should return tim hortons stores given valid radius, lat and lng', () => {
      return timhortons({
         rad: 10,
         origlat: 42.603187,
         origlng: -83.261646,
      }).then(result => {
         expect(result).to.be.an('array').that.is.not.empty;
      });
   });

   it('should throw error given missing options', () => {
      return timhortons()
         .then(() => {
            throw new Error('Should not return results with missing options');
         })
         .catch((err: any) => {
            expect(err.message).to.equal('Missing required parameter: options');
         });
   });

   it('should throw error given invalid radius', () => {
      return timhortons({ rad: -1, origlat: 42.603187, origlng: -83.261646 })
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
      return timhortons({ origlng: -83.261646 })
         .then(() => {
            throw new Error('Should not return results with missing latitude');
         })
         .catch((err: any) => {
            expect(err.message).to.equal('Missing required parameter: origlat');
         });
   });

   it('should throw error given missing longitude', () => {
      return timhortons({ origlat: 42.603187 })
         .then(() => {
            throw new Error('Should not return results with missing longitude');
         })
         .catch((err: any) => {
            expect(err.message).to.equal('Missing required parameter: origlng');
         });
   });
});
