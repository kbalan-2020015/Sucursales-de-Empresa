import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name: 'provider'
})

export class ProviderPipe implements PipeTransform{
    transform(products: any, provider: any) {
        if(provider === undefined){
            return products;
        }else{
            return products.filter((product:any)=>{
                return product.provider.toLowerCase().includes(provider.toLowerCase())

            })
        }
        
    }
}