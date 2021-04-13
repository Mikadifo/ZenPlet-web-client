import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { LostPet } from '../model/lost-pet.model';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lost-pet-printable',
  templateUrl: './lost-pet-printable.component.html',
  styleUrls: ['./lost-pet-printable.component.css'],
})
export class LostPetPrintableComponent implements OnInit {
  map!: mapboxgl.Map;
  mapbox = mapboxgl as typeof mapboxgl;
  style = `mapbox://styles/mapbox/streets-v11`;
  lat = -79.00468;
  lng = -2.897351;
  zoom = 15;
  lostPet: LostPet;
  visible: boolean = true;
  @ViewChild('lostMap') lostMap!: ElementRef;
  lostPetLocation: string = `${this.lat},${this.lng}`;

  constructor(private _location: Location) {
    this.lostPet = JSON.parse(localStorage.getItem('lostpet') || '');
    this.lostPetLocation = this.lostPet.lostPetLocation as string;
  }

  ngOnInit(): void {
    this.mapbox.accessToken = environment.mapboxKey;
  }

  ngAfterViewInit() {
    setTimeout(() => {
          console.log(this.lostPet.lostPetLocation as string);
          this.lostPetLocation = this.lostPet.lostPetLocation as string;
        let lostPetLocationArray: number[] = [
          ...this.lostPetLocation.split(','),
        ].map((item) => parseFloat(item));
        console.log(this.lostMap.nativeElement);
        this.map = new mapboxgl.Map({
          container: this.lostMap.nativeElement,
          style: this.style,
          center: [lostPetLocationArray[0], lostPetLocationArray[1]],
          zoom: this.zoom,
        });
        this.map.addControl(new mapboxgl.NavigationControl());
        this.createdMark(lostPetLocationArray[0], lostPetLocationArray[1]);
    }, 250);
  }

  createdMark(lat: number, lng: number) {
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([lat, lng])
      .addTo(this.map);

    marker.on('drag', () => {
      this.lostPetLocation = `${marker.getLngLat().lat},${marker.getLngLat().lng}`;
    });
  }

  onPrintLostPet() {
    print();
  }

  back() {
    this._location.back();
  }
}
