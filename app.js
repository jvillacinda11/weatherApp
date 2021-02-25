//city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || []
//loading in search history
let i = 0
searchHistory.forEach(searchItem => {
  let searchItemElem = document.createElement('div')

  searchItemElem.className = 'list-group-item'
  searchItemElem.innerHTML = `
  <p class="redo" id="${i}">${searchItem.name}</p>
  `
  document.getElementById('history').append(searchItemElem)
  i++
})


// click search history item
document.addEventListener('click', event => {
  if (event.target.classList.contains('redo')) {
    let items = document.getElementsByClassName('redo')
    // console.log(items.length)

  }

})


//time function
let now = moment().format('M/D/YYYY');
document.getElementById('time').innerHTML = now


//search function
document.getElementById('search').addEventListener('click', event => {
  event.preventDefault()

  let city = document.getElementById('city').value
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=959d59d14c0d12e689c64e9a2b21bf30&units=imperial`)
    .then(res => {
      let weather = res.data

      let icon = weather.weather[0].icon
      let lon = weather.coord.lon
      let lat = weather.coord.lat
      let temp = weather.main.temp
      let wind = weather.wind.speed
      let hum = weather.main.humidity
      let name = weather.name
      let searchItem = {
        name: name,
        lon: lon,
        lat: lat
      }
      searchHistory.push(searchItem)
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
      let searchItemElem = document.createElement('div')
      searchItemElem.className = 'list-group-item'
      searchItemElem.innerHTML = `
      <p class= "redo">${searchItem.name}</p>
      `
      document.getElementById('history').append(searchItemElem)


      axios.get(`https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=959d59d14c0d12e689c64e9a2b21bf30&units=imperial`)
        .then(rez => {
          let uv = rez.data

          let uvi = uv.value

          let uviNum = parseInt(uvi)

          document.getElementById('currentWeatherDiv').innerHTML = `
        <div class="container">
          <div class="row">
        <h1>${name} ${now} <img src= "http://openweathermap.org/img/wn/${icon}@2x.png"></h1>
        </div>
        <hr>
        <div class="row">
        <p>Temperature:  <strong>${temp}°F</strong></p>
        </div>
        <div class="row">
        <p>Humidity:  <strong>${hum}%</strong></p>
        </div>
        <div class="row">
        <p>Wind-Speed:  <strong>${wind}MPH</strong></p>
        </div>
        <div class="row">
          <p class="col-2">UV Index:</p>
          <p class="col-1" id= "color">${uvi}</p>
        </div>
       </div>
       `
          if (uviNum >= 0 && uviNum <= 2) {
            document.getElementById('color').classList.add('green')
          }
          if (uviNum >= 3 && uviNum <= 5) {
            document.getElementById('color').classList.add('yellow')
          }
          if (uviNum >= 6 && uviNum <= 7) {
            document.getElementById('color').classList.add('orange')
          }
          if (uviNum >= 8 && uviNum <= 10) {
            document.getElementById('color').classList.add('red')
          }

        })
        .catch(err => console.error(err))
      axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=959d59d14c0d12e689c64e9a2b21bf30&units=imperial`)
        .then(reslt => {
          let forecast = reslt.data
          console.log(forecast)
          let temp1 = forecast.list[4].main.temp
          let icon1 = forecast.list[4].weather[0].icon
          let hum1 = forecast.list[4].main.humidity
          // let date1 = forecast.list[4].clouds[0].dt_txt

          let temp2 = forecast.list[9].main.temp
          let icon2 = forecast.list[9].weather[0].icon
          let hum2 = forecast.list[9].main.humidity
          // let date2 = forecast.list[9].clouds[0].dt_txt

          let temp3 = forecast.list[14].main.temp
          let icon3 = forecast.list[14].weather[0].icon
          let hum3 = forecast.list[14].main.humidity
          // let date3 = forecast.list[14].clouds[0].dt_txt

          let temp4 = forecast.list[19].main.temp
          let icon4 = forecast.list[19].weather[0].icon
          let hum4 = forecast.list[19].main.humidity
          // let date4 = forecast.list[19].clouds[0].dt_txt

          let temp5 = forecast.list[24].main.temp
          let icon5 = forecast.list[24].weather[0].icon
          let hum5 = forecast.list[24].main.humidity
          // let date5 = forecast.list[24].clouds[0].dt_txt

          console.log('group 1:' + temp1 + icon1 + hum1 + 'group 2:' + temp2 + icon2 + hum2 + 'group 3:' + temp3 + icon3 + hum3 + 'group 4:' + temp4 + icon4 + hum4 + 'group 5:' + temp5 + icon5 + hum5)
          document.getElementById('forecast').innerHTML = `
                      <div class="col-sm-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Date</h5>
                  <img src = "http://openweathermap.org/img/wn/${icon1}@2x.png">
                  <p class="card-text">Temperature: ${temp1}°F</p>
                  <p class="card-text">humidity: ${hum1}%</p>
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Date</h5>
                  <img src = "http://openweathermap.org/img/wn/${icon2}@2x.png">
                  <p class="card-text">Temperature: ${temp2}°F</p>
                  <p class="card-text">humidity: ${hum2}%</p>
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Date</h5>
                  <img src = "http://openweathermap.org/img/wn/${icon3}@2x.png">
                  <p class="card-text">Temperature: ${temp3}°F</p>
                  <p class="card-text">humidity: ${hum3}%</p>
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Date</h5>
                  <img src = "http://openweathermap.org/img/wn/${icon4}@2x.png">
                  <p class="card-text">Temperature: ${temp4}°F</p>
                  <p class="card-text">humidity: ${hum4}%</p>
                </div>
              </div>
            </div>
            <div class="col-sm-2">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Date</h5>
                  <img src = "http://openweathermap.org/img/wn/${icon5}@2x.png">
                  <p class="card-text">Temperature: ${temp5}°F</p>
                  <p class="card-text">humidity: ${hum5}%</p>
                </div>
              </div>
            </div>
          
          `
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))


  document.getElementById('city').value = ''
})