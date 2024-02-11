var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([34.5, 40.5]),  // Türkiye merkezi
        zoom: 6
    })
});


var emptyStyle = new ol.style.Style({});

var turkeyLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'json/tr-cities.json', // Türkiye sınırları JSON dosyası
        format: new ol.format.GeoJSON()
    }),
    style: emptyStyle // Katmana boş stil uygulama
});

var northAmericaLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'json/northAmerica.json',
        format: new ol.format.GeoJSON()
    }),
    style: emptyStyle // Katmana boş stil uygulama
});

var southAmericaLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'json/SouthAmerica.json', // Güney Amerika GeoJSON dosyasının yolu
        format: new ol.format.GeoJSON()
    }),
    style: emptyStyle // Katmana boş stil uygulama
});
var europeLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'json/Europe.json', // Avrupa GeoJSON dosyasının yolu
        format: new ol.format.GeoJSON()
    }),
    style: emptyStyle // Katmana boş stil uygulama
});
var asiaLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'json/Asia.json', // Asya GeoJSON dosyasının yolu
        format: new ol.format.GeoJSON()
    }),
    style: emptyStyle // Katmana boş stil uygulama
});
var africaLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'json/Africa.json', // Afrika GeoJSON dosyasının yolu
        format: new ol.format.GeoJSON()
    }),
    style: emptyStyle // Katmana boş stil uygulama
});
var oceaniaLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'json/Oceania.json', // Okyanusya GeoJSON dosyasının yolu
        format: new ol.format.GeoJSON()
    }),
    style: emptyStyle // Katmana boş stil uygulama
});
var antarcticaLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'json/Antarctica.json', // Antartika GeoJSON dosyasının yolu
        format: new ol.format.GeoJSON()
    }),
    style: emptyStyle // Katmana boş stil uygulama
});

map.addLayer(turkeyLayer);
map.addLayer(northAmericaLayer);
map.addLayer(southAmericaLayer);
map.addLayer(europeLayer);
map.addLayer(asiaLayer);
map.addLayer(africaLayer);
map.addLayer(oceaniaLayer);
map.addLayer(antarcticaLayer);

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    },
    offset: [-91.5, 20] 
});

map.addOverlay(overlay);

// Pop-up'ı kapatma butonu için
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

// 'Türkiye'de mi?' özelliğini kontrol eden işlev
function checkIfPointInTurkey(evt) {
    var coordinate = evt.coordinate;
    var features = turkeyLayer.getSource().getFeatures();

    var pointInsideTurkey = features.some(function(feature) {
        return feature.getGeometry().intersectsCoordinate(coordinate);
    });

    if (pointInsideTurkey) {
        content.innerHTML = '<p>Seçilen nokta Türkiye sınırları içinde</p>';
    } else {
        content.innerHTML = '<p>Seçilen nokta Türkiye sınırları dışında</p>';
    }

    overlay.setPosition(coordinate);
}

document.getElementById('turkey').addEventListener('click', function() {
    map.un('singleclick', function(evt) {
    });
    switchToNormalMode(); // Önce normal moda geçme
    singleClickInteraction = function() {}; // singleclick olayını geçici olarak devre dışı bırakma
    map.on('singleclick', checkIfPointInTurkey); // Türkiye kontrolü etkileşimini ekleme
});

function whichContinent(evt) {
    var coordinate = evt.coordinate;

    var pointInsideNorthAmerica = northAmericaLayer.getSource().getFeatures().some(feature => feature.getGeometry().intersectsCoordinate(coordinate));
    var pointInsideSouthAmerica = southAmericaLayer.getSource().getFeatures().some(feature => feature.getGeometry().intersectsCoordinate(coordinate));
    var pointInsideEurope = europeLayer.getSource().getFeatures().some(feature => feature.getGeometry().intersectsCoordinate(coordinate));
    var pointInsideAsia = asiaLayer.getSource().getFeatures().some(feature => feature.getGeometry().intersectsCoordinate(coordinate));
    var pointInsideOceania = oceaniaLayer.getSource().getFeatures().some(feature => feature.getGeometry().intersectsCoordinate(coordinate));
    var pointInsideAntarctica = antarcticaLayer.getSource().getFeatures().some(feature => feature.getGeometry().intersectsCoordinate(coordinate));
    var pointInsideAfrica = africaLayer.getSource().getFeatures().some(feature => feature.getGeometry().intersectsCoordinate(coordinate));

    if (pointInsideNorthAmerica) {
        content.innerHTML = '<p>Seçilen nokta Kuzey Amerika sınırları içinde.</p>';
    } else if (pointInsideSouthAmerica) {
        content.innerHTML = '<p>Seçilen nokta Güney Amerika sınırları içinde.</p>';
    } else if (pointInsideEurope) {
        content.innerHTML = '<p>Seçilen nokta Avrupa sınırları içinde.</p>';
    } else if (pointInsideAsia) {
        content.innerHTML = '<p>Seçilen nokta Asya sınırları içinde.</p>';
    } else if (pointInsideOceania) {
        content.innerHTML = '<p>Seçilen nokta Okyanusya sınırları içinde.</p>';
    } else if (pointInsideAntarctica) {
        content.innerHTML = '<p>Seçilen nokta Antarktika sınırları içinde.</p>';
    } else if (pointInsideAfrica) {
        content.innerHTML = '<p>Seçilen nokta Afrika sınırları içinde.</p>';
    } else {
        content.innerHTML = '<p>Seçilen nokta okyanusta veya tanımlanamayan bir bölgede.</p>';
    }

    overlay.setPosition(coordinate);
}


document.getElementById('continent').addEventListener('click', function() {
    map.un('singleclick', function(evt) {
    });
    switchToNormalMode(); // Önce normal moda geçme
    singleClickInteraction = function() {}; // singleclick olayını geçici olarak devre dışı bırakma
    map.on('singleclick', whichContinent); // Türkiye kontrolü etkileşimini ekleme
});

function getWeather(lat, lon) {
    var apiKey = '1b71dcefd77c4d86ac6114008241002';
    var url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updatePopupWithWeather(data, lat, lon);
        })
        .catch(error => console.error('Error:', error));
}

function updatePopupWithWeather(weatherData, lat, lon) {
    content.innerHTML = `<p>Konum: ${lat.toFixed(2)}, ${lon.toFixed(2)}</p>
                   <p>Sıcaklık: ${weatherData.current.temp_c}°C</p>
                   <p>Hava Durumu: ${weatherData.current.condition.text}</p>`;
    overlay.setPosition(ol.proj.fromLonLat([lon, lat]));
}

// Hava Durumu için singleclick olayını tanımlayıcı işlev
var weatherSingleClickFunction = function(evt) {
    var coordinate = ol.proj.toLonLat(evt.coordinate);
    getWeather(coordinate[1], coordinate[0]); // Enlem, Boylam
};

// "Hava Durumu" butonu için olay dinleyici
document.getElementById('weather').addEventListener('click', function() {
    map.un('singleclick', function(evt) {
    });
    switchToNormalMode(); // Önce normal moda geçme
    map.on('singleclick', weatherSingleClickFunction); // Hava durumu için singleclick olayını ekleme
    singleClickInteraction = function() {}; // singleclick olayını geçici olarak devre dışı bırakma
});

function getCountryCode(lat, lon, callback) {
    var geocodeApiKey = '65c80b7d89cb0186766846ungb1858e';
    var geocodeUrl = `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${geocodeApiKey}`;

    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            var countryCode = data.address.country_code;
            callback(countryCode, lat, lon);
        })
        .catch(error => console.error('Error:', error));
}

function getTopNewsForCountry(countryCode, lat, lon) {
    var newsApiKey = '32c8aa4df2c9415c914cd91086cb8772';
    var newsUrl = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${newsApiKey}`;

    fetch(newsUrl)
        .then(response => response.json())
        .then(data => {
            if (data.articles.length > 0) {
                var topArticle = data.articles[0];
                updatePopupWithTopNews(topArticle, countryCode, lat, lon);
            }
        })
        .catch(error => console.error('Error:', error));
}

function updatePopupWithTopNews(article, countryCode, lat, lon) {
    var newsHTML = `<h3>${countryCode.toUpperCase()}: En Önemli Haber</h3>
                    <p><b>${article.title}</b></p>
                    <button onclick="window.open('${article.url}', '_blank')">Haberi Oku</button>`;
    
    content.innerHTML = newsHTML;
    overlay.setPosition(ol.proj.fromLonLat([lon, lat]));
}

var topNewsSingleClickFunction = function(evt) {
    var coordinate = ol.proj.toLonLat(evt.coordinate);
    getCountryCode(coordinate[1], coordinate[0], getTopNewsForCountry);
};

document.getElementById('topNews').addEventListener('click', function() {
    map.un('singleclick');
    switchToNormalMode();
    map.on('singleclick', topNewsSingleClickFunction);
    singleClickInteraction = function() {};
});

function getExchangeRates(sourceCurrency, targetCurrency, callback) {
    var apiKey = 'a13494a8c4mshd5be6a075cef131p1acb40jsnde48263f3557'; // RapidAPI key
    var url = `https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${sourceCurrency}&to=${targetCurrency}&amount=1`;

    fetch(url, {
        headers: {
            'x-rapidapi-host': 'currency-converter5.p.rapidapi.com',
            'x-rapidapi-key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data) {
                var exchangeRate = data.rates[targetCurrency]; // Exchange rate
                callback(sourceCurrency, targetCurrency, exchangeRate);
            }
        })
        .catch(error => console.error('Error:', error));
}

function updatePopupWithExchangeRate(countryCode, exchangeRate) {
    var exchangeRateHTML = `<h3>${countryCode}: Döviz Kuru</h3>
                            <p>1 ${countryCode} = ${exchangeRate} USD</p>`;
    
    content.innerHTML = exchangeRateHTML;
}

var exchangeRateSingleClickFunction = function(evt) {
    var coordinate = ol.proj.toLonLat(evt.coordinate);
    getCountryCode(coordinate[1], coordinate[0], function(countryCode) {
        getExchangeRates(countryCode, updatePopupWithExchangeRate);
    });
};

document.getElementById('exchangeRate').addEventListener('click', function() {
    map.un('singleclick');
    switchToNormalMode();
    map.on('singleclick', exchangeRateSingleClickFunction);
    singleClickInteraction = function() {};
});



// İşaretçi için bir stil oluşturma
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: '../img/pin.png',
        scale:0.09
    })
});

var selectedPoints = []; // Seçilen noktaları saklamak için bir dizi
var isDrawingPolygon = false;

var singleClickInteraction; // Global değişken

map.on('singleclick', function(event) {
    singleClickInteraction(event);
});

singleClickInteraction = function(event) {

    if (isDrawingPolygon) {
        // Polygon çizimi
        return;
    }

    if (selectedPoints.length < 2) { // Eğer daha az ise 2 nokta seçildiyse
        var coordinate = event.coordinate; // Tıklanan noktanın koordinatını alma

        // Yeni bir işaretçi oluşturma
        var iconFeature = new ol.Feature({
            geometry: new ol.geom.Point(coordinate)
        });

        iconFeature.setStyle(iconStyle);
        var vectorSource = new ol.source.Vector({
            features: [iconFeature]
        });
        var vectorLayer = new ol.layer.Vector({
            source: vectorSource
        });
        map.addLayer(vectorLayer);

        // Seçilen noktayı kaydetme
        selectedPoints.push(coordinate);

        // Eğer iki nokta seçildiyse, rota oluşturma
        if (selectedPoints.length === 2) {
            var startPoint = selectedPoints[0];
            var endPoint = selectedPoints[1];
            createRoute(startPoint, endPoint);
        }
    }
};

//Harita ve işaretçi kodları

document.getElementById('createRoute').addEventListener('click', function() {
    if (selectedPoints.length === 2) {
        var start = ol.proj.toLonLat(selectedPoints[0]);
        var end = ol.proj.toLonLat(selectedPoints[1]);
        
        // Google Maps'te rota oluşturmak için URL oluşturma
        var googleMapsUrl = `https://www.google.com/maps/dir/${start[1]},${start[0]}/${end[1]},${end[0]}`;
        window.open(googleMapsUrl, '_blank');
    } else {
        alert('Lütfen haritada başlangıç ve bitiş noktalarını seçin.');
    }
});

document.getElementById('saveRoute').addEventListener('click', function() {
    if (selectedPoints.length === 2) {
        var data = {
            StartCoordinateX: selectedPoints[0][0],
            StartCoordinateY: selectedPoints[0][1],
            EndCoordinateX: selectedPoints[1][0],
            EndCoordinateY: selectedPoints[1][1]
        };

        // AJAX isteği ile veriyi API'ye gönderme
        fetch('https://localhost:7164/api/route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Rota başarıyla kaydedildi:', data);
            alert("Rota başarıyla kaydedildi. Rota ID: " + data.id);
            // Başarılı kayıt sonrası, seçilen noktaları sıfırlama
            selectedPoints = [];
        })
        .catch((error) => {
            console.error('Hata:', error);
            alert('Rota kaydedilirken bir hata oluştu: ' + error.message);
        });
    } else {
        alert('Lütfen haritada başlangıç ve bitiş noktalarını seçin.');
    }
});


function deleteRoute(routeId) {
    fetch('https://localhost:7164/api/route/' + routeId, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Rota başarıyla silindi:', routeId);

            // Silinen rotanın satırını tablodan kaldırma
            document.querySelector(`#routeRow-${routeId}`).remove();
        })
        .catch((error) => {
            console.error('Silme işlemi sırasında hata oluştu:', error);
        });
}

document.getElementById('showRoutes').addEventListener('click', function() {
    loadRoutes();
});

function loadRoutes() {
    fetch('https://localhost:7164/api/route')
        .then(response => response.json())
        .then(data => {
            let content = '<table><tr><th>ID</th><th>Başlangıç Noktası</th><th>Bitiş Noktası</th><th>İşlem</th><th>Google Maps</th></tr>';

            data.forEach(route => {
                var startCoordinateX = route.startCoordinateX;
                var startCoordinateY = route.startCoordinateY;
                var endCoordinateX = route.endCoordinateX;
                var endCoordinateY = route.endCoordinateY;

                content += `<tr id="routeRow-${route.id}">
                                <td>${route.id}</td>
                                <td>(${startCoordinateX}, ${startCoordinateY})</td>
                                <td>(${endCoordinateX}, ${endCoordinateY})</td>
                                <td><button onclick="deleteRoute(${route.id})">Sil</button></td>
                                <td><button onclick="openRouteInMaps(${startCoordinateX}, ${startCoordinateY}, ${endCoordinateX}, ${endCoordinateY})">Maps</button></td>
                            </tr>`;
            });
            content += '</table>';

            jsPanel.create({
                theme: 'primary',
                headerTitle: 'Kaydedilen Rotalar',
                contentSize: '600 350',
                position: 'center',
                content: content
            });
        })
        .catch(error => console.error('Error:', error));
}

function openRouteInMaps(startX, startY, endX, endY) {
    var startLatLon = ol.proj.toLonLat([startX, startY]);
    var endLatLon = ol.proj.toLonLat([endX, endY]);

    var googleMapsUrl = `https://www.google.com/maps/dir/${startLatLon[1]},${startLatLon[0]}/${endLatLon[1]},${endLatLon[0]}`;
    window.open(googleMapsUrl, '_blank');
}


document.addEventListener('DOMContentLoaded', function() {
    var toggleIcon = document.getElementById('toggleIcon');
    var container = document.querySelector('.button-container');

    toggleIcon.addEventListener('click', function() {
        if (container.classList.contains('closed')) {
            container.classList.remove('closed');
            container.classList.remove('slow'); // Hızlı animasyonu etkinleştirmek
            toggleIcon.textContent = 'expand_less';
        } else {
            container.classList.add('closed');
            container.classList.add('slow'); // Yavaş animasyonu etkinleştirmek
            toggleIcon.textContent = 'expand_more';
        }
    });
});

var draw; // Çizim aracı
var source = new ol.source.Vector(); // Vektör katmanı kaynağı

var vector = new ol.layer.Vector({
    source: source
});
map.addLayer(vector); // Haritaya katman ekleme


function addPolygonInteraction() {
    switchToNormalMode(); // Önce normal moda geçme
    singleClickInteraction = function() {}; // singleclick olayını geçici olarak devre dışı bırakma

    draw = new ol.interaction.Draw({
        source: source,
        type: 'Polygon'
    });
    map.addInteraction(draw);
    draw.on('drawend', handleDrawEnd);
}


// Çizim tamamlandığında
function handleDrawEnd(event) {
    isDrawingPolygon = false;
    var polygon = event.feature.getGeometry();
    var area = ol.sphere.getArea(polygon);

    // Pop-up içeriğini güncelleme
    content.innerHTML = "Polygon Alanı: " + area.toFixed(2) + " metrekare";

    // Pop-up'ın konumunu ayarlama
    var extent = polygon.getExtent();
    var center = ol.extent.getCenter(extent);
    overlay.setPosition(center);
}


document.getElementById('drawPolygon').addEventListener('click', function() {
    map.removeInteraction(draw); // Mevcut çizim aracını kaldırmak
    addPolygonInteraction(); // Yeni çizim aracını eklemek
});


document.getElementById('normalMode').addEventListener('click', function() {
    switchToNormalMode();
});


function switchToNormalMode() {
    if (draw) {
        map.removeInteraction(draw);
    }
    source.clear(); // İşaretçileri temizlemek
    isDrawingPolygon = false; // Çizim modunu false olarak ayarlamak

    map.un('singleclick', checkIfPointInTurkey);
    map.un('singleclick', whichContinent);
    map.un('singleclick', weatherSingleClickFunction);
    map.un('singleclick', topNewsSingleClickFunction);
    map.un('singleclick',  exchangeRateSingleClickFunction);

    singleClickInteraction = function(event) {
        if (selectedPoints.length < 2) { // Eğer daha az ise 2 nokta seçildiyse
            var coordinate = event.coordinate; // Tıklanan noktanın koordinatını alma

            // Yeni bir işaretçi oluşturma
            var iconFeature = new ol.Feature({
                geometry: new ol.geom.Point(coordinate)
            });

            iconFeature.setStyle(iconStyle);
            var vectorSource = new ol.source.Vector({
                features: [iconFeature]
            });
            var vectorLayer = new ol.layer.Vector({
                source: vectorSource
            });
            map.addLayer(vectorLayer);

            // Seçilen noktayı kaydetme
            selectedPoints.push(coordinate);

            // Eğer iki nokta seçildiyse, rota oluşturma
            if (selectedPoints.length === 2) {
                var startPoint = selectedPoints[0];
                var endPoint = selectedPoints[1];
                createRoute(startPoint, endPoint);
            }
        }
    };
}