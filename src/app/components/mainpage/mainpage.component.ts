import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild('videoPlayer') videoplayer: any;

  toggleVideo() {
    this.videoplayer.play();
  }

}
