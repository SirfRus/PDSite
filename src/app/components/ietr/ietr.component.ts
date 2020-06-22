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

  languages: String[] = ['cpp'];
  
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

  code = `
    void MakeUserCommand0() 
    { 
      MbPlacement 3D pl; // Локальная СК (по умолчанию совпадает с мировой СК)
    
    // Вершины ломаной
      // Создание массива точек
      SArray<MbCartPoint>arrPnts(19);
    
      arrPnts.Add(MbCartPoint(30, 40));
      arrPnts.Add(MbCartPoint(30, 20));
      arrPnts.Add(MbCartPoint(0, 20));
      arrPnts.Add(MbCartPoint(0, 0));
      arrPnts.Add(MbCartPoint(100, 0));
      arrPnts.Add(MbCartPoint(100, 20));
      arrPnts.Add(MbCartPoint(70, 20));
      arrPnts.Add(MbCartPoint(70, 40));
    
      // ЛоманаялиниясвершинамиarrPnts
      MbPolyline* pPolyline = new MbPolyline(arrPnts, false/* Флагнезамкнутойлинии */);
    ChamferPolyContour(pPolyline, 5,5, false, false, arrPnts[4]);
    MbContour* pContour = new MbContour(*pPolyline, true);
    FilletPolyContour(pPolyline, 5, false, arrPnts[2], pContour);
      
      // Дуга окружности для замыкания ломаной.
      // При построении указывается центр, радиус, начальная и конечная точки и
      // направление обхода дуги между этими точками (значение initSense>0 соответствует
      // обходу против часовой стрелки, а initSense<0 – по часовой стрелке).
      MbCartPointarc Center(50, 40);
      Constdouble RADIUS = 20;
      MbArc* pArc = new MbArc(arcCenter, RADIUS, arrPnts[7], arrPnts[0], 1 /*initSense*/);
      // Контуриздвухсегментов
      pContour->AddSegment(pArc)
      // Отображениеконтура
      if (pContour)
        viewManager->AddObject(Style(1, RGB(0, 0, 255)), pContour, &pl);
      // Уменьшение счетчиков ссылок динамически созданных объектов ядра
      ::DeleteItem(pPolyline);
      ::DeleteItem(pArc);
      ::DeleteItem(pContour);
    }  
  `;

}
