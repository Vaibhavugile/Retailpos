export const parseSearchCode = (value) => {
    // Remove spaces and convert to uppercase
    const code = value.trim().toUpperCase();

    if (!code) {
        return {
            valid: false,
            type: null,
            code: ""
        };
    }

    // Product Code
    // Example: P000005
    if (/^P\d{6}$/.test(code)) {
        return {
            valid: true,
            type: "product",
            code,
            productCode: code
        };
    }

    // Variant Code
    // Example: P000005-01
    if (/^P\d{6}-\d{2}$/.test(code)) {
        return {
            valid: true,
            type: "variant",
            code,
            productCode: code.split("-")[0],
            variantCode: code
        };
    }

    return {
        valid: false,
        type: null,
        code
    };
};