import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as productActions from './product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from '../product';
import { of, Observable } from "rxjs";
import { Action } from "@ngrx/store";

@Injectable()
export class ProductEffects {
    constructor(private action$: Actions,
        private productService: ProductService) { }

    @Effect()
    loadProducts$: Observable<Action> = this.action$.pipe(
        ofType(productActions.ProductActionTypes.Load),
        mergeMap((action: productActions.Load) => this.productService.getProducts().pipe(
            map((products: Product[]) => (new productActions.LoadSuccess(products))),
            catchError(err => of(new productActions.LoadFail(err)))
            )
        )
    );

    @Effect()
    productActions$: Observable<Action> = this.action$.pipe(
        ofType(productActions.ProductActionTypes.UpdateProduct),
        map((action:productActions.UpdateProduct) => action.payload),
        mergeMap((product: Product) => 
            this.productService.updateProduct(product).pipe(
                map(updateProduct => (new productActions.UpdateProductSuccess(updateProduct))),
                catchError(err => of(new productActions.UpdateProductFail(err)))
            )
        )
    );

    @Effect()
    addProductActions$: Observable<Action> = this.action$.pipe(
        ofType(productActions.ProductActionTypes.AddProduct),
        map((action:productActions.AddProduct) => action.payload),
        mergeMap((product: Product) => 
            this.productService.createProduct(product).pipe(
                map(updateProduct => (new productActions.AddProductSuccess(updateProduct))),
                catchError(err => of(new productActions.AddProductFail(err)))
            )
        )
    );

    @Effect()
    deleteProductActions$: Observable<Action> = this.action$.pipe(
        ofType(productActions.ProductActionTypes.DeleteProduct),
        map((action:productActions.DeleteProduct) => action.payload),
        mergeMap((productId: number) => 
            this.productService.deleteProduct(productId).pipe(
                map(updateProduct => (new productActions.DeleteProductSuccess(productId))),
                catchError(err => of(new productActions.AddProductFail(err)))
            )
        )
    );

    
    
}