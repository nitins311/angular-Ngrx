import { Product } from "../product";
import { ProductActionTypes, ProductActions } from "./product.actions";


export interface ProductState {
    showProductCode: boolean;
    currentProductId: number | null;
    products: Product[];
    error: string;
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    products: [],
    error: ''
}

export function reducer(state = initialState, action: ProductActions): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload
            };
        case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProductId: action.payload
            };
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null
            };
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0
            };
        case ProductActionTypes.LoadSuccess:
            return{
                ...state,
                products: action.payload,
                error: ''
            }
        case ProductActionTypes.LoadFail:
            return{
                ...state,
                products:[],
                error:action.payload
            }
        case ProductActionTypes.UpdateProductSuccess:
        const updatedProducts = state.products.map(
            item => action.payload.id === item.id ? action.payload: item);
            return {
                ...state,
                products: updatedProducts,
                currentProductId: action.payload.id,
                error: ''
            }
        case ProductActionTypes.UpdateProductFail:
        return {
            ...state,
            error: action.payload
        };
        case ProductActionTypes.AddProductSuccess:
        state.products.push(action.payload);
        const newProducts = state.products;
        return{
            ...state,
            products: newProducts,
            currentProductId: action.payload.id,
            error: ''
        }
        case ProductActionTypes.AddProductFail:
        return{
            ...state,
            error: action.payload
        }
        case ProductActionTypes.DeleteProductSuccess:
        const filteredProduct = state.products.filter(x=>x.id !== action.payload);
        return{
            ...state,
            products: filteredProduct,
            currentProductId: null,
            error: ''
        }
        case ProductActionTypes.DeleteProductFail:
        return{
            ...state,
            error: action.payload
        }

        default:
            return state;
    }
}