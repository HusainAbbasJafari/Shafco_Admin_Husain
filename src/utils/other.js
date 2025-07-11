export const getStockStatus = quantity => {
  let stockStatus = {
    variant: 'success',
    text: 'In Stock'
  };
  if (quantity < 1) stockStatus = {
    variant: 'danger',
    text: 'Out of Stock'
  }; else if (quantity < 11) stockStatus = {
    variant: 'primary',
    text: 'Limited'
  };
  return stockStatus;
};
export const getRatingVariant = rating => {
  let ratingVariant = 'success';
  if (rating > 2 && rating < 4) ratingVariant = 'warning'; else if (rating < 2) ratingVariant = 'danger';
  return ratingVariant;
};
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
export const getRatingStatus = rating => {
  let ratingStatus = 'Excellent';
  if (rating <= 2) ratingStatus = 'Bad'; else if (rating > 2 && rating <= 3) ratingStatus = 'Good'; else if (rating > 3 && rating <= 4) ratingStatus = 'Best';
  return ratingStatus;
};

export const allowNumbersOnly = (e) => {
  const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
  if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
}

export const encodeId = (id) => btoa(id);

export const decodeId = (id) => atob(id)

export const detectDarkMode = (callback) => {
  const isDarkMode = document.documentElement.getAttribute('data-bs-theme') === 'dark';

  // Set up MutationObserver
  const observer = new MutationObserver(() => {
    const currentMode = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    callback(currentMode)
  });

  // Start observing the theme changes
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-bs-theme'],
  });

  return isDarkMode;
};


const emptyFunction = () => { };



export const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    boxShadow: 'none',
    borderColor: detectDarkMode(emptyFunction) ? (state.isFocused ? "var(--bs-light)" : "var(--bs-light)") : (state.isFocused ? "#ced4da" : "#ced4da"),
    backgroundColor: detectDarkMode(emptyFunction) ? "transparent" : '#fff',
    color: detectDarkMode(emptyFunction) ? "var(--bs-body-color)" : '',
    '&:hover': {
      borderColor: detectDarkMode(emptyFunction) ? "var(--bs-light)" : "#ced4da",
    },

  }),
  singleValue: (base) => ({
    ...base,
    color: detectDarkMode(emptyFunction) ? "var(--bs-body-color)" : "",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    backgroundColor: detectDarkMode(emptyFunction) ? "var(--bs-light)" : "#fff",
    color: detectDarkMode(emptyFunction) ? "var(--bs-body-color)" : "",
  }),

  option: (base, { isSelected }) => ({
    ...base,
    fontSize: '0.875rem',
    backgroundColor: isSelected ? '#ffe6e6' : (detectDarkMode(emptyFunction) ? "var(--bs-light)" : '#fff'),
    color: detectDarkMode(emptyFunction) ? "var(--bs-body-color)" : '#212529',
    '&:hover': {
      backgroundColor: '#ffe6e6'
    },
  }),
};

export const selectDisabled = (isDisabled) => {
  return {
    control: (base, state) => ({
      ...base,
      borderColor: detectDarkMode(() => { }) ? (state.isFocused ? "var(--bs-light)" : "var(--bs-light)") : (state.isFocused ? "#ced4da" : "#ced4da"),
      backgroundColor: isDisabled ? '#f9f7f7' : base.backgroundColor, // light gray when disabled
      cursor: isDisabled ? 'not-allowed' : 'default',
      opacity: isDisabled ? 1 : 1,
      boxShadow: 'none',
      '&:hover': {
        borderColor: detectDarkMode(() => { }) ? "var(--bs-light)" : "#ced4da",
      },
    }),
  }
}

export const customTableStyles = (isDarkMode) => {
  const styles = {
    headRow: {
      style: {
        backgroundColor: isDarkMode ? "var(--bs-light)" : "",
        color: "var(--bs-body-color)",
        fontWeight: "600",
      },
    },
    rows: {
      style: {
        backgroundColor: isDarkMode ? "var(--bs-light)" : "",
        color: "var(--bs-body-color)",
        "&:hover": {
          backgroundColor: isDarkMode ? "var(--bs-light)" : "",
        },
      },
    },
    headCells: {
      style: {
        color: "var(--bs-body-color)",
        fontWeight: "600",
      },
    },
    cells: {
      style: {
        color: "var(--bs-body-color)",

      },
    },
    pagination: {
      style: {
        backgroundColor: isDarkMode ? "var(--bs-light)" : "#fff",  // Fix footer (pagination background)
        color: "var(--bs-body-color)",
      },
    }
  }

  const styleId = 'datatable-custom-style';
  const existingStyle = document.getElementById(styleId);
  const css = `
    .rdt_Pagination select:focus {
      outline: none;
      border-color: var(--bs-body-color);
      background-color: ${isDarkMode ? 'var(--bs-light)' : '#fff'};
      color: ${isDarkMode ? '#fff' : '#000'};
    }
    .RZGgn {
    background-color: ${isDarkMode ? 'var(--bs-light)' : '#fff'} !important;
    color: var(--bs-body-color) !important;
    font-weight: 500;
    text-align: center;
    padding: 1rem;
  }
  `;

  if (existingStyle) {
    existingStyle.innerHTML = css;
  } else {
    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  return styles;
}


export const mapToSelectOptions = (list, labelKey, valueKey) =>
  list?.map(item => ({
    label: item[labelKey],
    value: item[valueKey],
  })) || [];

export const toLocalDateString = (date) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return null;
  }
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Adjust for local timezone
  return d.toISOString().slice(0, 10);
};


export function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

export const formatIDRCurrency = (value) => {
  let cleanedValue = value?.replace(/[^0-9,]/g, ''); // keep numbers and commas (as decimals)
  const parts = cleanedValue?.split(',');
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // thousand separator
  return parts.join(',');
};

export const formatIDRCustom = (value, options = {}) => {
  const {
    withPrefix = false,
    decimalPlaces = 2,
  } = options;

  if (value == null || value === '') return withPrefix ? 'Rp 0' : '0';
  let stringValue = value.toString().replace(/[^0-9.,]/g, '');
  stringValue = stringValue.replace(/,/g, '.');
  let [integerPart, decimalPart = ''] = stringValue.split('.');
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (decimalPlaces > 0) {
    decimalPart = (decimalPart + '00').slice(0, decimalPlaces);
    return `${withPrefix ? 'Rp ' : ''}${integerPart},${decimalPart}`;
  }
  return `${withPrefix ? 'Rp ' : ''}${integerPart}`;
};

export const unformatIDR = (formattedValue) => {
  if (!formattedValue) return 0;

  return formattedValue
    .toString()
    .replace(/[^0-9,]/g, '')
    .replace(/\./g, '')
    .replace(',', '.');
};

export const parseIDRCurrency = (value) => {
  return value.replace(/\./g, "");
};

export function stripHtmlTags(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
