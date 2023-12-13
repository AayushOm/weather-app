import React, { useState,useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('Noida');
  const [weather, setWeather] = useState({});
  const [data,setData]=useState(false);

  useEffect(() => {
    fetchWeatherData(query);
    // eslint-disable-next-line
  }, []);


  const fetchWeatherData = (city) => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=JFFUKFFCV2TV2XLC2KMVMQZMT`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        setData(true);
        console.log(result);
      })
      .catch(error => {
        alert("Enter a valid city name");
        setQuery('');
        console.error('Error fetching data:', error);
      });
  };
  
  
  const search = evt => {
    if (evt.key === "Enter") {
      fetchWeatherData(query);
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(data!==false) ? ((weather.days[0].temp > 60) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter the city name ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(data!==false) ? (
        <div>
          <div>
            <div className="location-box">
              <div className="location">{weather.resolvedAddress}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="weather">
                Temprature: {weather.days[0].temp} F
              </div>
              <h2 className='description'>{weather.days[0].description}</h2>
            </div>
          </div>
          <div className='data-box'>
            <div className="container">
              <img src="https://png.pngtree.com/png-vector/20190328/ourmid/pngtree-vector-temperature-icon-png-image_884043.jpg" alt="" />
              <p>Feels like</p>
              <div className='container_details'>
                <span>{weather.days[0].feelslike} </span>
                <small>F</small>
              </div>
            </div>
            <div className="container">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWWkzijvBDGNmaSwhqWZ-V5LrLnfZEDgzEWQ&usqp=CAU" alt="" />
              <p>Wind speed</p>
              <div className='container_details'>
                <span>{weather.days[0].windspeed} </span>
                <small>km/hr</small>
              </div>
            </div>
            <div className="container">
              <img src="data:image/png;base64,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" alt="" />
              <p>Humidity</p>
              <div className='container_details'>
                <span>{weather.days[0].humidity} </span>
                <small>%</small>
              </div>
            </div>
            <div className="container">
              <img src="data:image/png;base64,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" alt="" />
              <p>Visiblity</p>
              <div className='container_details'>
                <span>{weather.days[0].visibility} </span>
                <small>km</small>
              </div>
            </div>
            <div className="container">
              <img src="https://openclipart.org/image/800px/308749" alt="" />
              <p>Air Pressure</p>
              <div className='container_details'>
                <span>{weather.days[0].pressure} </span>
                <small>hPa</small>
              </div>
              

            </div>
          </div>
        </div>
        
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
