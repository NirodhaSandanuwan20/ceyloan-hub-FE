import { Pipe, PipeTransform } from '@angular/core';
import { log } from 'console';

@Pipe({
  name: 'filterLevel'
})
export class FilterLevelPipe implements PipeTransform {

  transform(value: any[], filterLevel: string, audience: string ): any[] {
    const filteredArray = [];


    if(value.length === 0 || filterLevel === '' || audience === ''){
      return value;
      console.log('first if');
    }
    
    for(const item of value){
      if(item.audience === filterLevel){
        filteredArray.push(item);
        console.log('sec if');
      }
      
    }
    
    
    return filteredArray;
  }

}
