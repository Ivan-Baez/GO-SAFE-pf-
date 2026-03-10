import { Config } from "tailwindcss";

const config: Config ={
    content:[
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/componetns/**/*.{js,ts,jsc,tsx,mdx}",
        "./src/app/**/*.{js,tx,jsx,tsx,mdx}",
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
            fontFamily: {
                poppins: ['Poppins', 'sans-serif'],
                manjari: ['Manjari', 'sans-serif'],
            },
        },
    },
    plugins:[],
};
export default config;