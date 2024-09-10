// theme.js

export const theme = {
    foreground: "#000000",
    background: "#ffffff",
    primary: "#1a4548",
    secondary: "#ffe2c7",
    tertiary: "#F6F6F6",
    slate: "#1E293B",
    colors: [
        {
            color: "#f9f9f9",
            name: "Base",
            slug: "base"
        },
        {
            color: "#ffffff",
            name: "Base / Two",
            slug: "base-2"
        },
        {
            color: "#111111",
            name: "Contrast",
            slug: "contrast"
        },
        {
            color: "#636363",
            name: "Contrast / Two",
            slug: "contrast-2"
        },
        {
            color: "#A4A4A4",
            name: "Contrast / Three",
            slug: "contrast-3"
        },
        {
            color: "#cfcabe",
            name: "Accent",
            slug: "accent"
        },
        {
            color: "#c2a990",
            name: "Accent / Two",
            slug: "accent-2"
        },
        {
            color: "#d8613c",
            name: "Accent / Three",
            slug: "accent-3"
        },
        {
            color: "#b1c5a4",
            name: "Accent / Four",
            slug: "accent-4"
        },
        {
            color: "#b5bdbc",
            name: "Accent / Five",
            slug: "accent-5"
        }
    ]
};

// Define the getColor function here
export const getColor = (colorSlug) => {
    // Check flat properties first
    if (theme[colorSlug]) {
        return theme[colorSlug];
    }

    // Then check the colors array
    const colorObj = theme.colors.find(color => color.slug === colorSlug);
    return colorObj ? colorObj.color : colorSlug; // Return the color if found, otherwise return the colorSlug directly
};
