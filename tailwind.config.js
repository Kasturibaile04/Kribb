/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors:{
            primary : "#0E4D92",
            accent : "#F59E0B",
            card:"#1A1A2E",
            
        },
        fontFamily:{

            sans : ["Rubik_400Regular"],
            medium : ["Rubik_500Medium"],
            bold : ["Rubik_700Bold"],
            extrabold : ["Rubik_800ExtraBold"],

            Roboto : ["Roboto_400Regular"],
            RobotoMedium : ["Roboto_500Medium"],
            RobotoBold : ["Roboto_700Bold"],
            RobotoExtrabold : ["Roboto_800ExtraBold"],

            Jakarta: ["PlusJakartaSans_400Regular"],
            JakartaMedium: ["PlusJakartaSans_500Medium"],
            JakartaBold: ["PlusJakartaSans_700Bold"],
            JakartaExtrabold: ["PlusJakartaSans_800ExtraBold"],

        },
        
    },
  },
  plugins: [],
}