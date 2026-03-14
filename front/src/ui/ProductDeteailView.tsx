"use client"
import { useAuth } from '@/context/AuthContext';
import { IProduct } from '@/types/types'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProductDeteailView:React.FC<IProduct> = ({name,id,image,description,price}) => {
    const router = useRouter;
    const {userData} = useAuth ();

return (
    <>
        <div>
            <img src={image} alt={name} />
        </div>
        <div>
            <h1>{name}</h1>
        <div>
            <span>${price}</span>
            <span>
                USD
            </span>
        </div>    
        </div>
        <div>
            <h2>Descripción</h2>
            <p>
                {description}
            </p>
        </div>
        <button>
            onClick = {}
        </button>
        <span>
            Carrito de compras
        </span>
    </>
)
}

export default ProductDeteailView