const detectDateFormat = (dateStr) => {
    // Regular expressions for different date formats
    const formats = [
        { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}z$/, format: "yyyy-MM-dd'T'HH:mm:ss.SSS[z]" },
        { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}z$/, format: "yyyy-MM-dd'T'HH:mm:ss[z]" },
        { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/, format: "yyyy-MM-dd'T'HH:mm:ss.SSSz" },
        { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}$/, format: "yyyy-MM-dd'T'HH:mm:ssz" },
        { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, format: "yyyy-MM-dd'T'HH:mm" },
        { regex: /^\d{4}-\d{2}-\d{2}$/, format: "yyyy-MM-dd" },
        { regex: /^\d{2}-\d{2}-\d{4}$/, format: "MM-dd-yyyy" },
        { regex: /^\d{2}\/\d{2}\/\d{4}$/, format: "MM/dd/yyyy" },
        { regex: /^\d{2}\.\d{2}\.\d{4}$/, format: "MM.dd.yyyy" },
        { regex: /^\d{2}-\d{2}-\d{4}$/, format: "dd-MM-yyyy" },
        { regex: /^\d{4}\/\d{2}\/\d{2}$/, format: "yyyy/MM/dd" },
        { regex: /^\d{2}\/\d{2}\/\d{2}$/, format: "dd/MM/yy" },
        { regex: /^\d{2}-\d{2}-\d{2}$/, format: "MM-dd-yy" },
        { regex: /^\d{4}\.\d{2}\.\d{2}$/, format: "yyyy.MM.dd" },
        { regex: /^\d{2}:\d{2}:\d{2}\.\d{3}$/, format: "HH:mm:ss.SSS" },
        { regex: /^\d{2}:\d{2}:\d{2}$/, format: "HH:mm:ss" },
        { regex: /^\d{2}:\d{2}$/, format: "HH:mm" },
        { regex: /^\d{2} \d{2} \d{4}$/, format: "dd MM yyyy" },
        { regex: /^\d{2} \d{2} \d{2}$/, format: "dd MM yy" },
        { regex: /^\d{2} \w+ \d{4}$/, format: "dd Month yyyy" },
        { regex: /^\d{2} \w{3} \d{4}$/, format: "dd Mon yyyy" },
        { regex: /^\d{4} \w+ \d{2}$/, format: "yyyy Month dd" },
        { regex: /^\d{4} \w{3} \d{2}$/, format: "yyyy Mon dd" },
        { regex: /^\d{2}-\w{3}-\d{4}$/, format: "dd-Mon-yyyy" },
        { regex: /^\d{2}:\d{2}:\d{2} [aPM]{2}$/, format: "HH:mm:ss a" },
        { regex: /^\d{2}:\d{2} [aPM]{2}$/, format: "HH:mm a" },
        { regex: /^\d{2}:\d{2}:\d{2}\.\d{3} [aPM]{2}$/, format: "HH:mm:ss.SSS a" },
        { regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, format: "yyyy-MM-dd HH:mm:ss" },
        { regex: /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/, format: "dd-MM-yyyy HH:mm:ss" },
        { regex: /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/, format: "dd/MM/yyyy HH:mm:ss" },
        { regex: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}:\d{2}$/, format: "dd.MM.yyyy HH:mm:ss" },
        { regex: /^\d{2} \w+, \d{4}$/, format: "MM dd, yyyy" },
        { regex: /^\d{8}$/, format: "yyyyMMdd" },
        { regex: /^\d{14}$/, format: "yyyyMMddHHmmss" },
        { regex: /^\d{12}$/, format: "yyyyMMddHHmm" },
        { regex: /^\w+, \d{4}$/, format: "Month, yyyy" },
        { regex: /^\w{3}, \d{4}$/, format: "Mon, yyyy" },
        { regex: /^\d{2} \w+, \d{4}$/, format: "dd Month, yyyy" },
        { regex: /^\d{2} \w{3}, \d{4}$/, format: "dd Mon, yyyy" },
        { regex: /^\d{2}-\w+-\d{2}$/, format: "dd-Month-yy" },
        { regex: /^\w{3}-\d{2}-\d{2}$/, format: "Mon-dd-yy" },
        { regex: /^\w+ \d{2} \d{4}$/, format: "Month dd yyyy" },
        { regex: /^\w{3} \d{2} \d{4}$/, format: "Mon dd yyyy" },
        { regex: /^\d{4} \w+ \d{2} \d{2}:\d{2}:\d{2}$/, format: "yyyy Month dd HH:mm:ss" },
        { regex: /^\d{4} \w{3} \d{2} \d{2}:\d{2}:\d{2}$/, format: "yyyy Mon dd HH:mm:ss" },
        { regex: /^\d{2} \w+ \d{4} \d{2}:\d{2}:\d{2}$/, format: "dd Month yyyy HH:mm:ss" },
        { regex: /^\d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2}$/, format: "dd Mon yyyy HH:mm:ss" },
        { regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} [aPM]{2}$/, format: "yyyy-MM-dd HH:mm:ss.SSS a" },
        { regex: /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2} [aPM]{2}$/, format: "yyyy/MM/dd HH:mm:ss a" },
        { regex: /^\d{2} \w+ \d{2}$/, format: "dd Month yy" },
        { regex: /^\d{2}-\w+-\d{4} \d{2}:\d{2}:\d{2}$/, format: "dd-Month-yyyy HH:mm:ss" },
        { regex: /^\w{3}\. \d{2}, \d{4}$/, format: "Mon. dd, yyyy" },
        { regex: /^\w+\. \d{2}, \d{4}$/, format: "Month. dd, yyyy" },
        { regex: /^\d{2}\w{2} \w+ \d{4}$/, format: "ddth Month yyyy" },
        { regex: /^\d{2}\w{2} of \w+, \d{4}$/, format: "ddth of Month, yyyy" },
        { regex: /^\w+ \d{4}, \d{2}$/, format: "Month yyyy, dd" },
        { regex: /^\d{4} \w+ \d{2} \d{2}:\d{2} [aPM]{2}$/, format: "yyyy Month dd HH:mm a" },
        { regex: /^\d{4} \w{3} \d{2} \d{2}:\d{2} [aPM]{2}$/, format: "yyyy Mon dd HH:mm a" },
        { regex: /^\d{2} \w+ \d{4} \d{2}:\d{2} [aPM]{2}$/, format: "dd Month yyyy HH:mm a" },
        { regex: /^\d{2} \w{3} \d{4} \d{2}:\d{2} [aPM]{2}$/, format: "dd Mon yyyy HH:mm a" },
        { regex: /^\d{2}-\w+-\d{4} \d{2}:\d{2} [aPM]{2}$/, format: "dd-Month-yyyy HH:mm a" },
        { regex: /^\d{2}-\w{3}-\d{4} \d{2}:\d{2}:\d{2} [aPM]{2}$/, format: "dd-Mon-yyyy HH:mm:ss a" },
        { regex: /^\d{4} \d{2} \d{2} \d{2}:\d{2}:\d{2}$/, format: "yyyy MM dd HH:mm:ss" },
        { regex: /^\d{2}-\w{3}-\d{2}$/, format: "dd-MMM-yy" },
        { regex: /^\d{2} \w+ \d{4} \d{2}:\d{2}:\d{2} [aPM]{2}$/, format: "dd Month yyyy HH:mm:ss a" },
        { regex: /^\d{2} \w+, \d{4} \d{2}:\d{2}:\d{2} [aPM]{2}$/, format: "dd Month, yyyy HH:mm:ss a" },
        { regex: /^\d{4}-\d{2}-\d{2}$/, format: "yyyy-dd-MM" },
        { regex: /^\d{4}\/\d{2}\/\d{2}$/, format: "yyyy/dd/MM" },
        { regex: /^\w+-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/, format: "Month-dd-yyyy HH:mm:ss" },
        { regex: /^\w{3}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/, format: "Mon-dd-yyyy HH:mm:ss" },
        { regex: /^\d{2} \w+, \d{4} \d{2}:\d{2}:\d{2}\.\d{3}$/, format: "dd Month, yyyy HH:mm:ss.SSS" },
        { regex: /^\d{4} \w+ \d{2} \d{2}:\d{2}:\d{2} [aPM]{2}$/, format: "yyyy Month dd HH:mm:ss a" },
        { regex: /^\d{4} \w+ \d{2} \d{2}:\d{2}:\d{2}\.\d{3} [aPM]{2}$/, format: "yyyy Month dd HH:mm:ss.SSS a" },
        { regex: /^\d{2} \w+ \d{4} \d{2}:\d{2}:\d{2}\.\d{3} [aPM]{2}$/, format: "dd Month yyyy HH:mm:ss.SSS a" },
        { regex: /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/, format: "yyyy/dd/MM HH:mm:ss" },
        { regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, format: "yyyy-dd-MM HH:mm:ss" },
        { regex: /^\d{4} \w+ \d{2} \d{2}:\d{2}:\d{2}\.\d{3}$/, format: "yyyy Month dd HH:mm:ss.SSS" },
        { regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, format: "yyyy-MM-dd'T'HH:mm:ss" },
    
    

        // ... add more formats as needed
    ];

    for (let i = 0; i < formats.length; i++) {
        if (formats[i].regex.test(dateStr)) {
            return formats[i].format;
        }
    }

    return null;
}

// Test the function
const testdate = "2023-10-15T18:45:32.123z";
console.log(detectDateFormat(testdate));  // Should return "yyyy-MM-ddTHH:mm:ss.SSS[z]"
