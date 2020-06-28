import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatacontainerService } from '../../services/datacontainer.service'

@Component({
  selector: 'app-ietr',
  templateUrl: './ietr.component.html',
  styleUrls: ['./ietr.component.css']
})
export class IetrComponent implements OnInit {

  constructor(private http: HttpClient, private Datacontainer: DatacontainerService) { }

  ngOnInit(): void {
  }

  chooseExm(id, link: string, name: string) {
    this.idchecker = id;
    this.link = link;
    this.exmName = name;
  }

  link: string = "../../../assets/Examples/exm-1.png";  
  idchecker = 1;
  exmName: string = "2D эскиз";
  code = this.Datacontainer.exms;  

  exmDB = [    
    { id: 1, src: "../../../assets/Examples/exm-1.png", name: "2D эскиз" },
    { id: 2, src: "../../../assets/Examples/exm-2.png", name: "Операция выдавливания эскиза" },
    { id: 3, src: "../../../assets/Examples/exm-3.png", name: "Построение точек в 3D пространстве" },
    { id: 4, src: "../../../assets/Examples/exm-4.png", name: "Создание твердотельной операцией выдавливания" },
    { id: 5, src: "../../../assets/Examples/exm-5.png", name: "Операция вращения" },
    { id: 6, src: "../../../assets/Examples/exm-6.png", name: "Операции построения элементарных тел" },
    { id: 7, src: "../../../assets/Examples/exm-7.png", name: "Построение крюка операцией лофта" },
    { id: 8, src: "../../../assets/Examples/exm-8.png", name: "Операция сдвига" },
    { id: 9, src: "../../../assets/Examples/exm-9.png", name: "Построение червяка операцией сдвига" },
  ];  
}
