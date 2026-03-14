import { IProudctDetailPago } from '@/types/propTypes'
import ProductDeteailView from '@/ui/ProductDeteailView'
import { getProductByID } from '@/service/productService' 
import React from 'react'

const productDetailPage:React.FC<IProudctDetailPago> = async ({paramas}) => {
    const {productID} = await paramas;
    const productDetail = await getProductByID(productID)
    return (
        <ProductDeteailView {...productDetail}/>
    )
}

export default productDetailPage 