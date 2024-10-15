export const URL = import.meta.env.VITE_API_URL;
export const URL_IMG = import.meta.env.VITE_API_URL_IMG;

// Token generator
export function token() {
  const config = {
    headers: {
      token: JSON.parse(localStorage.getItem("token")),
    },
  };
  return config;
}

// Date converter
export function dateConverter(isoDate) {
  const date = new Date(isoDate);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // for 12-hour format
  });
  return `${formattedDate} at ${formattedTime}`;
}
