import { Component } from '@angular/core';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  combinations: string[][] = [];

  constructor(public variantService: TestService) {}

  ngOnInit(): void {
    const variantValuesLists = this.variantService.getVariantValues();
    this.combinations = this.generateCombinations(variantValuesLists);
  }

  generateCombinations(lists: string[][]): string[][] {
    const result: string[][] = [];

    const helper = (current: string[], index: number): void => {
      if (index === lists.length) {
        result.push([...current]);
        return;
      }

      for (const value of lists[index]) {
        current.push(value);
        helper(current, index + 1);
        current.pop();
      }
    };

    helper([], 0);

    return result;
  }
}
