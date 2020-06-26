import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatacontainerService {

  constructor() { }
  
  exms = [
    {
        id: 0,
        code: `
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
        `
    },
    {
        id: 1,
        code: `
            voidCreateSketch(RPArray<MbContour>&_arrContours)
            {
            // Создание массива точек квадрата, к которому в дальнейшем добавятся скругления.
            // Размер массива - 8 точек для учета точек четырех сегментов скруглений.
            SArray<MbCartPoint>arrPnts(8);
            arrPnts.Add(MbCartPoint(0, 0));
            arrPnts.Add(MbCartPoint(50, 0));
            arrPnts.Add(MbCartPoint(50, 50));
            arrPnts.Add(MbCartPoint(0, 50));
            // Построение единой ломаной внешнего контура по точкам
            MbPolyline* pPolyline = newMbPolyline(arrPnts, true);
            MbContour* pContourPolyline = NULL;
            // ЗаданиескруглениясиспользованиемфункцииFilletPolyContour
            ::FilletPolyContour(pPolyline, 5, false, arrPnts[4], pContourPolyline);
            // Задание индексов точек, в которых будет задаваться скругление с учетом
            // добавления новой точки при скруглении с использованием функции FilletTwoSegments
            ptrdiff_t idxSideRight1 = 0;
            ptrdiff_t idxSideRight2 = 2;
            ptrdiff_t idxSideRight3 = 4;
            // Добавлениескруглений
            pContourPolyline->FilletTwoSegments(idxSideRight1, 5);
            pContourPolyline->FilletTwoSegments(idxSideRight2, 5);
            pContourPolyline->FilletTwoSegments(idxSideRight3, 5);
            _arrContours.push_back(pContourPolyline);
            }

            void MakeUserCommand1()
            {
            // Локальная СК (по умолчанию совпадает с мировой СК)
            MbPlacement3Dpl;

            // Создание образующей для тела выдавливания
            RPArray<MbContour>arrContours;
            CreateSketch(arrContours);

            // Отображение образующей (в плоскости XY глобальной СК)
            for (inti = 0; i<arrContours.size(); i++)
            viewManager->AddObject(Style(1, LIGHTRED), arrContours[i], &pl);

            // ПОСТРОЕНИЕ ТЕЛА ВЫДАВЛИВАНИЯ
            // Образующая размещается на плоскости XY глобальной СК.
            // Важное замечание: объект-плоскость должен создаваться динамически,
            // поскольку он продолжает использоваться в объекте-твердом теле после
            // выхода из данной функции.
            MbPlane* pPlaneXY = newMbPlane(MbCartPoint3D(0, 0, 0),
            MbCartPoint3D(1, 0, 0),
            MbCartPoint3D(0, 1, 0));

            // Объект, хранящий параметры образующей
            MbSweptDatasweptData(*pPlaneXY, arrContours);

            // Направляющий вектор для операции выдавливания
            MbVector3Ddir(0, 0, -1);

            // Параметры операции выдавливания, задающие свойства тела для построения в прямом
            // и в обратном направлении вдоль (глубина выдавливания и уклон).
            constdouble HEIGHT_FORWARD = 60.0, HEIGHT_BACKWARD = 0.0;
            constdouble ANGLE_FORWARD_DEGREE = 15.0;
            ExtrusionValuesextrusionParams(HEIGHT_FORWARD, HEIGHT_BACKWARD);

            // Указание уклона для выдавливания в прямом направлении
            extrusionParams.side1.rake = ANGLE_FORWARD_DEGREE * M_PI / 180.0;

            // Именователи элементов модели твердого тела и контуров образующей
            MbSNameMakeroperNames(1, MbSNameMaker::i_SideNone, 0);
            PArray<MbSNameMaker>cNames(0, 1, false);

            // Вызов функции-утилиты для построения твердого тела выдавливания
            MbSolid* pSolid = NULL;
            MbResultType res = ::ExtrusionSolid(sweptData, dir, NULL, NULL, false,
            extrusionParams, operNames, cNames, pSolid);

            // Отображениепостроенноготела
            if (res == rt_Success)
                {
            // Смещение тела по оси Y, чтобы при отображении оно не накладывалось на образующую
            pSolid->Move(MbVector3D(0, 0, 0));
            viewManager->AddObject(Style(1, LIGHTGRAY), pSolid);
            }

            // Уменьшение счетчиков ссылок динамически созданных объектов ядра
            ::DeleteItem(pSolid);
            }
        `
    },
    {
        id: 2,
        code: `
            void MakeUserCommand2()
            {
                MbPlacement3D pl; // Локальная СК (по умолчанию совпадает с мировой СК)

                //Массив из точек
                SArray<MbCartPoint3D> arrPnts(8);
                arrPnts.Add(MbCartPoint3D(0, 0, 0));
                arrPnts.Add(MbCartPoint3D(0, 50, 0));
                arrPnts.Add(MbCartPoint3D(50, 50, 0));
                arrPnts.Add(MbCartPoint3D(50, 0, 0));
                arrPnts.Add(MbCartPoint3D(15, 15, 40));
                arrPnts.Add(MbCartPoint3D(15, 35, 40));
                arrPnts.Add(MbCartPoint3D(35, 35, 40));
                arrPnts.Add(MbCartPoint3D(35, 15, 40));
                //Выделения массива точек синим цветом
                viewManager->AddObject(Style(1, BLUE), new MbPointFrame(arrPnts));
            }
        `
    },
    {
        id: 3,
        code: `
            void CreateSketch(RPArray<MbContour>& _arrContours)
            {
            // Создание массива точек квадрата, к которому в дальнейшем добавятся скругления.
            // Размер массива - 8 точек для учета точек четырех сегментов скруглений.
                SArray<MbCartPoint> arrPnts(8);
                arrPnts.Add(MbCartPoint(0, 0));
                arrPnts.Add(MbCartPoint(50, 0));
                arrPnts.Add(MbCartPoint(50, 50));
                arrPnts.Add(MbCartPoint(0, 50));
            // Построение единой ломаной внешнего контура по точкам
                MbPolyline* pPolyline = new MbPolyline(arrPnts, true);
                MbContour* pContour = new MbContour(*pPolyline, true);
            // Центры и радиусы окружностей, дуги которых входят в контур
                const MbCartPoint centerCircle(25, 25);
                const double RAD = 10;
                MbArc* pCircle = new MbArc(centerCircle, RAD);
                MbContour* pContourCircle = new MbContour(*pCircle, true);
                _arrContours.push_back(pContour);
                _arrContours.push_back(pContourCircle);
            }
            void MakeUserCommand0()
            {
                MbPlacement3D pl; // Локальная СК (по умолчанию совпадает с мировой СК)
            // СОЗДАНИЕ КОНТУРОВ ДЛЯ ОБРАЗУЮЩЕЙ
                RPArray<MbContour> arrContours;
                CreateSketch(arrContours);

            // Отображение образующей (в плоскости XY глобальной СК)
                for (int i = 0; i < arrContours.size(); i++)
                viewManager->AddObject(Style(1, RGB(0, 0, 255)), arrContours[i], &pl);
            // ПОСТРОЕНИЕ ТЕЛА ВЫДАВЛИВАНИЯ
            // Образующая размещается на плоскости XY глобальной СК.
            // Важное замечание: объект-плоскость должен создаваться динамически,
            // поскольку он продолжает использоваться в объекте-твердом теле после
            // выхода из данной функции.
                MbPlane* pPlaneXY = new MbPlane(MbCartPoint3D(0, 0, 0), MbCartPoint3D(1, 0, 0),
                MbCartPoint3D(0, 1, 0));
            // Объект, хранящий параметры образующей
                MbSweptData sweptData(*pPlaneXY, arrContours);
            // Направляющий вектор для операции выдавливания
                MbVector3D dir(0, 0, -1);
            // Параметры операции выдавливания, задающие свойства тела для построения:
            // расстояние выдавливания в прямом и в обратном направлении вдоль
            // направляющего вектора
                const double HEIGHT_FORWARD = 100.0, HEIGHT_BACKWARD = 0.0;
                ExtrusionValues extrusionParam(HEIGHT_FORWARD, HEIGHT_BACKWARD);
            // Служебный объект для именования элементов модели твердого тела
                MbSNameMaker operNames(ct_CurveExtrusionSolid, MbSNameMaker::i_SideNone, 0);
                PArray<MbSNameMaker> cNames(0, 1, false);
            // Построение твердого тела выдавливания
                MbSolid* pSolid = NULL;
                MbResultType res = ::ExtrusionSolid(sweptData, dir, NULL, NULL, false,
                extrusionParam, operNames, cNames, pSolid);
            // Отображение построенного тела
                if (res == rt_Success)
                {
            // Смещение тела по оси Y, чтобы при отображении оно не накладывалось на образующую
                    pSolid->Move(MbVector3D(0, 80, 0));
                    viewManager->AddObject(Style(1, LIGHTGRAY), pSolid);
                }
            // Уменьшение счетчиков ссылок динамически созданных объектов ядра
                ::DeleteItem(pSolid);
                ::DeleteItem(pPlaneXY);
                for (int i = 0; i < arrContours.size(); i++)
                    ::DeleteItem(arrContours[i]);
            }
        `   
    }
  ]    
}
