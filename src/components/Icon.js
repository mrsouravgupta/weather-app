import React from "react";

const Icon = (props) => {
  return (
    <i
      className={
        getIcon(props.description) +
        " icon" +
        (props.small ? "-sm" : "") +
        (props.small ? " px-1" : " pt-4 px-4")
      }
    ></i>
  );
};

Icon.defaultProps = {
  description: "",
  small: false,
};

const getIcon = (description) => {
  description = description.toLowerCase();
  if (description === "clear") return "bi bi-sun";
  if (description === "rain") return "bi bi-cloud-drizzle";
  if (description === "clouds") return "bi bi-cloud";
  if (description === "snow") return "bi bi-snow";
  if (description === "drizzle") return "bi bi-cloud-drizzle";
  if (description === "thunderstorm") return "bi bi-cloud-lightning-rain";
  return "bi bi-cloud-haze";
};

export default Icon;
