/**
 * Get current date.
 *
 * @returns {String} Day of the week, day month year
 */
export const getDate = () => {
  const date = new Date();
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" }); // "Friday"
  const day = date.getDate().toString().padStart(2, "0"); // "31"
  const month = date.toLocaleString("en-US", { month: "long" }); // "March"
  const year = date.getFullYear(); // 2023

  return `${dayOfWeek}, ${day} ${month} ${year}`; // "Friday, 31 March 2023"
};
