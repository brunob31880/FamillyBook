//create a function isMobileDevice take a dimension parameter which is an object with width and height properties
//return true if dimension.width is less than 768
//return false if dimension.width is greater than or equal to 768
export const isMobileDevice = (dimension) => {
    return dimension.width < 768;
    }
    