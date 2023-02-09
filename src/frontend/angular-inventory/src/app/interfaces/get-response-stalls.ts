import {Stall} from "../common/stall";

export interface GetResponseStalls {
  _embedded: {
    stalls: Stall[];
  }
}
