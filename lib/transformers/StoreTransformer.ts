import { IStoreResponse } from '../models';

export default class StoreTransformer {
   public transform(data: any): IStoreResponse {
      return {
         storeid: +data.storeid,
         address1: data.address1,
         address2: data.address2,
         city: data.city,
         lat: +data.lat,
         lng: +data.lng,
         distance: +data.distance,
         province: data.province,
         postal: data.postal,
         phone: data.phone,
         timcard: data.timcard === 'TRUE',
         instoreseating: data.instoreseating === 'TRUE',
         hrs24: data.hrs24 === 'TRUE',
         coldstone: data.coldstone === 'TRUE',
         wifi: data.wifi === 'TRUE',
         servicedisruptionflag: data.servicedisruptionflag === 'TRUE',
         drivethru: data.drivethru === 'TRUE',
         doubledrivethru: data.doubledrivethru === 'TRUE',
         catering: data.catering === 'TRUE',
         selfservice: data.selfservice === 'TRUE',
         coldstonesoftswirl: data.coldstonesoftswirl,
         kurig: data.kurig === 'TRUE',
         tassimo: data.tassimo === 'TRUE',
         nfc: data.nfc === 'TRUE',
         barcode: data.barcode === 'TRUE',
         id: +data.id,
      };
   }
}
