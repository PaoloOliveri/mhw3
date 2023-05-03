//Funzione che inserisce nel elemento del DOM "article" con id "view", i risultati delle informazioni sulla città restituiti dall'API Web Search
function onJson_info(json){
    
    const city = document.querySelector('#view');
    const city_list = document.createElement('div');
    city_list.setAttribute("id", "city_list");
    const results_info = json.knowledge_panel;
    const city_img = document.createElement('img');
    const city_text = document.createElement('h2');
    
    if(results_info){
        city_text.textContent = results_info.description.text;
        if(results_info.image.page_url != null){
            city_img.src = results_info.image.page_url;
        }
    }else {
        city_text.textContent = json.results[0].description;
        city_img.src = "image_not_found.png";
    }

    city_list.appendChild(city_text);
    city_list.appendChild(city_img);
    city.appendChild(city_list);
}
//Funzione che esegue la fetch dell'API Foreca Weather current, la quale richiede come parametro l'id del luogo, acquisito tramite l'API Foreca Weather location search
function onJson_weather_location_search(json){
    
    const results_location = json.locations[0].id;
    
    const url_weather_current = 'https://foreca-weather.p.rapidapi.com/current/' + results_location + '?alt=0&tempunit=C&windunit=MS&tz=Europe%2FLondon&lang=en';
    
    fetch(url_weather_current, 
    {
        headers: {
            'content-type': content_type,
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': weather_host
        }
    }).then(onResponse).then(onJson_weather_current);
}
//Funzione che inserisce nel elemento del DOM "article" con id "view", i risultati del meteo restituiti dall'API Foreca Weather
function onJson_weather_current(json){
    
    const weather = document.querySelector('#view');
    const result_weather = json.current;
    
    const weather_list = document.createElement('div');
    weather_list.setAttribute("id", "weather_list");
    
    const temperature_list = document.createElement('div');
    temperature_list.setAttribute("id", "temperature_list");
    
    const temperature_text = document.createElement('h2');
    temperature_text.textContent = "Temperature";
    
    const temperature_img = document.createElement('img');
    temperature_img.src = "temperature.png";
    
    const temperature = document.createElement('h4');
    temperature.textContent = result_weather.temperature + "°";
    
    temperature_list.appendChild(temperature_text);
    temperature_list.appendChild(temperature_img);
    temperature_list.appendChild(temperature);

    const humidity_list = document.createElement('div');
    humidity_list.setAttribute("id", "humidity_list");
    const humidity_text = document.createElement('h2');
    humidity_text.textContent = "Humidity";
    const humidity_img = document.createElement('img');
    humidity_img.src = "humidity.png";
    const humidity = document.createElement('h4');
    humidity.textContent = result_weather.relHumidity + "%";
    humidity_list.appendChild(humidity_text);
    humidity_list.appendChild(humidity_img);
    humidity_list.appendChild(humidity);

    const wind_list = document.createElement('div');
    wind_list.setAttribute("id", "wind_list");
    const wind_text = document.createElement('h2');
    wind_text.textContent = "Wind";
    const wind_img = document.createElement('img');
    wind_img.src = "wind.png";
    const wind = document.createElement('h4');
    wind.textContent = result_weather.windSpeed + "km/h";
    wind_list.appendChild(wind_text);
    wind_list.appendChild(wind_img);
    wind_list.appendChild(wind);

    const pressure_list = document.createElement('div');
    pressure_list.setAttribute("id", "pressure_list");
    const pressure_text = document.createElement('h2');
    pressure_text.textContent = "Pressure";
    const pressure_img = document.createElement('img');
    pressure_img.src = "pressure.png";
    const pressure = document.createElement('h4');
    pressure.textContent = result_weather.pressure + "hPa";
    pressure_list.appendChild(pressure_text);
    pressure_list.appendChild(pressure_img);
    pressure_list.appendChild(pressure);

    const cloudiness_list = document.createElement('div');
    cloudiness_list.setAttribute("id", "cloudiness_list");
    const cloudiness_text = document.createElement('h2');
    cloudiness_text.textContent = "Cloudiness";
    const cloudiness_img = document.createElement('img');
    cloudiness_img.src = "cloudiness.png";
    const cloudiness = document.createElement('h4');
    cloudiness.textContent = result_weather.cloudiness + "%";
    cloudiness_list.appendChild(cloudiness_text);
    cloudiness_list.appendChild(cloudiness_img);
    cloudiness_list.appendChild(cloudiness);

    const precipProb_list = document.createElement('div');
    precipProb_list.setAttribute("id", "precipProb_list");
    const precipProb_text = document.createElement('h2');
    precipProb_text.textContent = "Rainfall";
    const precipProb_img = document.createElement('img');
    precipProb_img.src = "precipProb.png";
    const precipProb = document.createElement('h4');
    precipProb.textContent = result_weather.precipProb + "%";
    precipProb_list.appendChild(precipProb_text);
    precipProb_list.appendChild(precipProb_img);
    precipProb_list.appendChild(precipProb);

    weather_list.appendChild(temperature_list);
    weather_list.appendChild(humidity_list);
    weather_list.appendChild(wind_list);
    weather_list.appendChild(pressure_list);
    weather_list.appendChild(cloudiness_list);
    weather_list.appendChild(precipProb_list);
    
    weather.appendChild(weather_list);
}
//Funzione che esegue la fetch dell'API Local Business Data, la quale richiede come parametri la latitudine e la longitudine, acquisiti tramite l'API Foreca Weather, e il tipo di cibo da ricercare, inserito da tastiera tramite il campo 'input' con id 'food' aggiunto al DOM tramite la funzione 'changeForm'
function onJson_geolocalization(json){
    
    const lat = json.locations[0].lat;
    const lon = json.locations[0].lon;
    
    const food_content = document.querySelector('#food_content');
    //Si controlla che sia stato inserito del testo nel campo "input" con id "food_content"
    if(food_content.value){
    console.log('Ricerco ristoranti di tipo: ' + food_content.value);
    //Serve per codificare una stringa come componente URL
    const food_content_value = encodeURIComponent(food_content.value);
    
    const url_resturants = 'https://local-business-data.p.rapidapi.com/search-nearby?query=' + food_content_value + '&lat=' + lat + '&lng=' + lon + '&limit=21';
    
    fetch(url_resturants,
        {
            headers: {
                'content-type': content_type,
                'X-RapidAPI-Key': local_business_data_key,
                'X-RapidAPI-Host': local_business_data_host
            }
        }).then(onResponse).then(onJson_resturants);
    } else {
        //Se non è stato inserito nessun valore nel campo "input" con id "food", viene stampata la scritta "Inserire testo" proprio nel campo "input" con id "food"
        console.log("Inserire del testo");
        food_content.value = "Inserire testo!!!";
    }
}
//Funzione che aggiunge al DOM i risultati restituiti dall'API Local Business Data
function onJson_resturants(json){
    
    const resturants = document.querySelector('#view');
    
    const resturants_list = document.createElement('div');
    resturants_list.setAttribute("id", "resturants");
    const results_resturants = json.data;
    //Itera l'array dei risultati e controlla che sia presente sia la foto che la valutazione, se non sono presenti scarta il risultato e passa a quello successivo
    for(result of results_resturants){
        if(result.photos_sample[0].photo_url != null){
            if(result.rating != null){
                
                const resturant_list = document.createElement('div');
                resturant_list.classList.add('resturant');
                
                const resturant_name = document.createElement('h2');
                resturant_name.textContent = result.owner_name;
                
                const resturant_rating = document.createElement('h3');
                resturant_rating.textContent = "Rating: " + result.rating;
                
                const resturant_img = result.photos_sample[0].photo_url;
                const img = document.createElement('img');
                img.src = resturant_img;
                
                const resturant_address = document.createElement('h3');
                resturant_address.textContent = result.address;
                
                resturant_list.appendChild(resturant_name);
                resturant_list.appendChild(resturant_rating);
                resturant_list.appendChild(img);
                resturant_list.appendChild(resturant_address);
                resturants_list.appendChild(resturant_list);
            }
        }

    }
    resturants.appendChild(resturants_list);
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

//Funzione che si occupa eliminare,se presente, il contenuto dell'elemento del DOM "article" con id "view" ed eseguie la ricerca a seconda della scelta selezionata nel menu a tendina 
function search(event){
    //Serve per impedire l'esecuzione del submit nel form
    event.preventDefault();
    //Seleziona l'article e elimina se presente il suo contenuto
    const content_view = document.querySelector('#view');
    content_view.innerHTML="";

    const content_input = document.querySelector('#content');
    //Controlla che sia stato inserito del testo nel campo "input"
    if(content_input.value){
        //Serve per codificare una stringa come componente URL
        const content_value = encodeURIComponent(content_input.value);
        console.log('Ricerco informazioni su: ' + content_value);
        //Acquisisce il valore inserito nel menu a tendina, cosi da poter decidere quale fetch eseguire
        const tipo_input = document.querySelector('#tipo').value;
        console.log('Ricerco tipo selezionato: ' + tipo_input);
        if(tipo_input === "info"){
            
            const url_info = 'https://web-search24.p.rapidapi.com/?query='+ content_value +'&limit=10';
            
            fetch(url_info,
            {
                headers: {
                    'content-type': content_type,
		            'X-RapidAPI-Key': key,
		            'X-RapidAPI-Host': web_search_host
                }
            }).then(onResponse).then(onJson_info);
        } else if(tipo_input === "weather"){
            
            const url_weather_location_search = 'https://foreca-weather.p.rapidapi.com/location/search/' + content_value + '?';
            
            fetch(url_weather_location_search, 
            {
                headers: {
                    'content-type': content_type,
                    'X-RapidAPI-Key': key,
                    'X-RapidAPI-Host': weather_host
                }
            }).then(onResponse).then(onJson_weather_location_search);
        } else if(tipo_input === "resturants"){
            
            const url_geolocalization = 'https://foreca-weather.p.rapidapi.com/location/search/' + content_value;
            
            fetch(url_geolocalization,
            {
                headers: {
                    'content-type': content_type,
		            'X-RapidAPI-Key': key,
		            'X-RapidAPI-Host': weather_host
                }
            }).then(onResponse).then(onJson_geolocalization);

        }
    } else {
        //Se non è stato inserito nessun valore nel campo 'input', viene stampata la scritta 'Inserire testo' proprio nel campo 'input'
        console.log("Inserire del testo");
        content_input.value = "Inserire testo!!!";
    }
}
//Funzione che controlla se la scelta selezionata è uguale a resturants, se si aggiunge il campo con id "food" per la ricerca dei ristoranti
function changeForm(event){
    
    
    const tipo_input = document.querySelector('#tipo').value;
    console.log('Ricerco tipo selezionato: ' + tipo_input);
    
    const food_input_group = document.querySelector('#food');
    //Controlla se il valore inserito nel menu a tendina è uguale a resturants
    if(tipo_input === "resturants"){
        //Elimina il contenuto dell'label se presente
        food_input_group.innerHTML = '';
        
        const food_text = document.createElement('span');
        food_text.textContent= "Cibo: ";
        
        const food_content = document.createElement('input');
        food_content.setAttribute("type", "text");
        food_content.setAttribute("id", "food_content");
        
        food_input_group.appendChild(food_text);
        food_input_group.appendChild(food_content);
    } else{
        //Se si è selezionato un campo diverso da "resturants", elimina l'ipototetico campo aggiuntivo "food" di resturants
        food_input_group.innerHTML = '';
    }
}

const form = document.querySelector('form');
const select = form.querySelector("select");

const content_type = 'application/octet-stream';
const weather_host = 'foreca-weather.p.rapidapi.com';
const web_search_host = 'web-search24.p.rapidapi.com';
const local_business_data_host = 'local-business-data.p.rapidapi.com';
const key = '2e1f89de2amshd40f38c269b9279p1d2f5ajsnab2978928214';
const local_business_data_key = '17bb8b1c1emshfc217b2044f9cdap18c887jsn339a5e6fa6ac';

select.addEventListener("change", changeForm);
form.addEventListener('submit', search);