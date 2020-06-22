import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ietr',
  templateUrl: './ietr.component.html',
  styleUrls: ['./ietr.component.css']
})
export class IetrComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getJPG() {
    this.http.get('https://upload.wikimedia.org/wikipedia/commons/4/41/Sunflower_from_Silesia2.jpg').subscribe(data => {
      return data;
    })
  }

  exmDB = [    
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ];

}
