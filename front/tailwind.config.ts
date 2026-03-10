import { Config } from "tailwindcss";

const config: Config ={
    content:[
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme:{
        extend:{
            backgroundImage:{
                "gradient-radial": "radial-gradient(var(--tw-gradient,stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            spacing :{
                1:"8px",
                2:"16px",
                3:"24px",
                4:"32px",
                5:"40px",
                6:"48px",
                7:"56px",
                8:"64px",
            },
        },
    },
    plugins:[],
};
export default config;