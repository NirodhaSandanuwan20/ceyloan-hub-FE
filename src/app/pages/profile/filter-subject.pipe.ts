import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSubject'
})
export class FilterSubjectPipe implements PipeTransform {

  transform(value: any[], filterSubject: string, category: string ): any[] {
    const filteredArray = [];


    if(value.length === 0 || filterSubject === '' || category === ''){
      return value;
      console.log('first if');
    }
    
    for(const item of value){
      if(item.category === filterSubject){
        filteredArray.push(item);
      }
      
    }
    
    
    return filteredArray;
  }

}
