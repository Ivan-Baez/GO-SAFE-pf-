"use client";
import { IService } from '@/types/types'
import React from 'react'
import { useAuth } from '@/context/AuthContext'

const Card:  React.FC<IService> = ({name,place,image,id,sport}) =>{
    const {userData} = useAuth ();

//quitarle el Link

    return(
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">

                <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        src={image} 
                        alt={name} 
                    />
                </div>
                

                <div className="p-4 flex-1 flex flex-col">
                    <h2 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 min-h-14">
                        {name}
                    </h2>
                    <div>
                        <p>

                        </p>
                        {sport}
                    </div>
                    <div className="mt-auto">
                        <p className="text-2xl font-bold text-black-600 mb-3">
                            {place}
                        </p>
                    </div>
                
                </div>
            </div>
    )
}

export default Card;




