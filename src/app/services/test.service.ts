// variant.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private jsonObject = {
    variantRequests: [
      {
        variantName: 'Màu',
        variantValues: ['Đỏ', 'Xanh'],
      },
      {
        variantName: 'Size',
        variantValues: ['To', 'Nhỏ'],
      },
      {
        variantName: 'Chất lượng',
        variantValues: ['Cao', 'Thấp'],
      },
    ],
  };

  getVariantValues(): string[][] {

    return this.jsonObject.variantRequests.map((variant) => variant.variantValues);
  }
}
