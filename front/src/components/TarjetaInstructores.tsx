"use client";
import React from "react";
import { IService } from "@/types/types";
import { instructors } from "@/lib/experiencias";
import Link from "next/link";

// ── Card Component ───────────────────────────────────────────────────────────
const Card: React.FC<IService> = ({id, name, place, image,  modality }) => {
return (
    <>
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;500;600;700&display=swap');

        .instructor-card {
        background: white;
        border-radius: 18px;
        overflow: hidden;
        box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
        font-family: 'Nunito', sans-serif;
        }
        .instructor-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 32px rgba(0,0,0,0.13);
        }
        .instructor-card:hover .card-img {
        transform: scale(1.05);
        }
        .card-img-wrap {
        width: 100%;
        height: 200px;
        overflow: hidden;
        background: #e8e8e8;
        }
        .card-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
        }
        .card-body {
        padding: 16px 18px 18px;
        }
        .card-name {
        font-family: 'Nunito', sans-serif;
        font-weight: 700;
        font-size: 15px;
        color: #1a1a1a;
        margin: 0 0 6px;
        line-height: 1.3;
        }
        .card-location {
        display: flex;
        align-items: flex-start;
        gap: 5px;
        color: #666;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.4;
        }
        .card-location svg {
        flex-shrink: 0;
        margin-top: 1px;
        color: #e8633a;
        }
    `}</style>
    <>
    <Link href="/experiences">
    <div className="instructor-card">
        <div className="card-img-wrap">
        <img className="card-img" src={image} alt={name} />
        </div>
        <div className="card-body">
        <h3 className="card-name">
            {name}
            {modality && (
                <span style={{ fontWeight: 500, color: "#555" }}>
                {" "}({modality})
            </span>
            )}
        </h3>
        <div className="card-location">
            {/* Location pin icon */}
            <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.5 0C3.46 0 1 2.46 1 5.5c0 4.125 5.5 10.5 5.5 10.5S12 9.625 12 5.5C12 2.46 9.54 0 6.5 0zm0 7.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                fill="#e8633a"
                />
            </svg>
            <span>{place}</span>
            </div>
            </div>
        </div>
    </Link>
    </>
    </>
);
};

export default Card