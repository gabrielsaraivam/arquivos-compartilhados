/*
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* eslint-disable no-undef, @typescript-eslint/no-unused-vars, no-unused-vars */
import "./style.css";

// @ts-nocheck TODO(jpoehnelt) remove when fixed

interface Maquina {
    nome: string;
    centro: google.maps.LatLngLiteral;
    alertas: number;
  }
  
  const citymap: Record<string, Maquina> = {
    maquina1: {
        nome: "Máquina 1",
        centro: { lat: -23.566567458514972, lng: -46.65283274365217 },
        alertas: 150,
    },
    maquina2: {
        nome: "Máquina 2",
        centro: { lat: -23.576775975750455, lng: -46.692107208771565 },
        alertas: 180,
    },
    maquina3: {
        nome: "Máquina 3",
        centro: { lat: -23.62910833636377, lng: -46.652584202624096 },
        alertas: 600,
    },
  };


// Initialize the map.
function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      zoom: 10,
      center: { lat: -23.59373794523387, lng: -46.654958783987986 },
    }
  );
  
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();

  geocodeLatLng(geocoder, map, infowindow);

  // (document.getElementById("submit") as HTMLElement).addEventListener(
  //   "click",
  //   () => {
  //     geocodeLatLng(geocoder, map, infowindow);
  //   }
  // );

  for (const alerta in citymap) {
    // Add the circle for this city to the map.
    const alertCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: citymap[alerta].centro,
      radius: Math.sqrt(citymap[alerta].alertas) * 100,
    });
  }
}


// This function is called when the user clicks the UI button requesting
// a geocode of a place ID.
function geocodeLatLng(
  geocoder: google.maps.Geocoder,
  map: google.maps.Map,
  infowindow: google.maps.InfoWindow
) {
  
  let listaLatLong = JSON.parse(sessionStorage["localizacao"]);

  for (let i of listaLatLong){
    const input =  i //(document.getElementById("latlng") as HTMLInputElement).value;
    const latlngStr = input.split(",", 2);
    const latlng = {
      lat: parseFloat(latlngStr[0]),
      lng: parseFloat(latlngStr[1]),
    };

    geocoder
      .geocode({ location: latlng })
      .then((response) => {
        if (response.results[0]) {
          map.setZoom(13);

          var icon = {
              url: "https://cdn-icons-png.flaticon.com/512/4550/4550968.png", // url
              scaledSize: new google.maps.Size(55, 55), // scaled size
              origin: new google.maps.Point(0,0), // origin
              anchor: new google.maps.Point(0,0) // anchor
          };

          const marker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: icon,
            
          });

        //   const infowindow = new google.maps.InfoWindow
        //   infowindow.setContent(response.results[0].formatted_address);
        //   infowindow.open(map, marker);

        let maquinaAtual = "Máquina 1";

        const informacoesMaquina =
        
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h2 id="firstHeading" class="firstHeading">'+ maquinaAtual +'</h2>' +
            '<div id="bodyContent">' +
            "<p><b>Status: </b>Alerta. <b>Endereço:</b> " +
            "Av. Paulista, 1000.</p>" +
            '<p>Link - referência: <a href="https://google.com.br/">' +
            "https://google.com.br/</a></p>" +
            "</div>" +
            "</div>";
    
      const infowindow = new google.maps.InfoWindow({
        content: informacoesMaquina,
      });

    
      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });

        } else {
          window.alert("No results found");
        }
      })
      .catch((e) => window.alert("Geocoder failed due to: " + e));
  }
}
export { initMap };


