/**
 * Password Validator
 */
export function isAllPresent(str: string) {
    // Regex to check if a string
    // contains uppercase, lowercase
    // special character & numeric value
    let pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );

    // If the string is empty
    // then print No
    if (!str || str.length === 0) {
        return false;
    }

    // Print Yes If the string matches
    // with the Regex
    if (pattern.test(str)) {
        return true;
    } else {
        return false;
    }
}