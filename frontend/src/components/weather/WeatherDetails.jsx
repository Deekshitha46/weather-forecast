import GlassCard from "../ui/GlassCard";

function WeatherDetails({ weather }) {

  if (!weather) {
    return null;
  }

  const details = [
    {
      title: "Humidity",
      value: `${weather.humidity}%`,
    },
    {
      title: "Wind Speed",
      value: `${weather.wind_speed} km/h`,
    },
    {
      title: "Pressure",
      value: `${weather.pressure} hPa`,
    },
    {
      title: "Visibility",
      value: `${weather.visibility} m`,
    },
    {
      title: "Sunrise",
      value: weather.sunrise,
    },
    {
      title: "Sunset",
      value: weather.sunset,
    },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >

      {details.map((item) => (

        <GlassCard key={item.title}>

          <p
            style={{
              color: "#8ea6c9",
              marginBottom: "10px",
            }}
          >
            {item.title}
          </p>

          <h2>
            {item.value}
          </h2>

        </GlassCard>

      ))}

    </div>
  );
}

export default WeatherDetails;
    