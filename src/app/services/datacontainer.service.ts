import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatacontainerService {

  constructor() { }
  
  exms = [
    {
        id: 1,
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
        `,
        links: [
            {                
                link: `MbCartPoint::Add(X, Y)`,
                des: ` - создание двумерной точки. X, Y –  координаты точек.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_cart_point.html#a730323c8cacf593c0719cbac98a709ae`
            },
            {                
                link: `MbPolyline* pPolyline = newMbPolyline(arrPnts, false)`,
                des: ` - создание контура из массива точек.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_polyline.html`
            },
            {                
                link: `ChamferPolyContour(pPolyline, 5.5, false, false, arrPnts[4]) - создание фаски`,
                des: ` - создание фаски`,
                href: `https://c3d.ascon.ru/doc/math/group___algorithms__2_d.html#ga7dfa2b52d0d05ae91dca84de35ed34dd`
            },
            {                
                link: `MbContour* pContour = newMbContour(*pPolyline, true) - применение фаски на контуре`,
                des: ` - применение фаски на контуре`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_contour.html`
            },
            {                
                link: `FilletPolyContour(pPolyline, 5, false, arrPnts[2], pContour) - создание сопряжения на контуре`,
                des: ` - создание сопряжения на контуре`,
                href: `https://c3d.ascon.ru/doc/math/group___algorithms__2_d.html#ga89deb3b8febcc1128905161999fa97ae`
            },           
            {                
                link: `MbArc* pArc = newMbArc(arcCenter, RADIUS, arrPnts[7], arrPnts[0], 1 /*initSense*/) – создаем арку на эскизе.`,
                des: ` – создаем арку на эскизе.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_arc.html`
            },
            {                
                link: `pContour->AddSegment(pArc) – отображение арки на эскизе.`,
                des: ` – отображение арки на эскизе.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_contour.html#af73017659948d7eedf9e18ecad031d60`                
            },
            {                
                link: `viewManager->AddObject(Style(1, RGB(0, 0, 255)), pContour, &pl) – отображение контура`,
                des: ` – отображение контура`,
                href: `https://c3d.ascon.ru/doc/math/class_render_container.html#a7d88739edf478f8c62a394b302863de8`
            },
            {                
                link: `::DeleteItem() - функция уменьшения счетчика ссылок динамически созданных объектов ядра.`,
                des: ` - функция уменьшения счетчика ссылок динамически созданных объектов ядра.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_assembly.html#a1dede90dbdf6952021115fa319c377ca`
            }
        ]                         
    },
    {
        id: 2,
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
        `,
        links: [
            {                
                link: `MbCartPoint::Add(X, Y)`,
                des: ` - создание двумерной точки. X, Y –  координаты точек.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_cart_point.html#a730323c8cacf593c0719cbac98a709ae`
            },
            {                
                link: `MbPolyline* pPolyline = newMbPolyline(arrPnts, false)`,
                des: ` - создание контура из массива точек.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_polyline.html`
            },
            {                
                link: `ChamferPolyContour(pPolyline, 5.5, false, false, arrPnts[4])`,
                des: ` - создание фаски`,
                href: `https://c3d.ascon.ru/doc/math/group___algorithms__2_d.html#ga7dfa2b52d0d05ae91dca84de35ed34dd`
            },
            {                
                link: `MbContour* pContour = newMbContour(*pPolyline, true)`,
                des: ` - применение фаски на контуре`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_contour.html`
            },
            {                
                link: `FilletPolyContour(pPolyline, 5, false, arrPnts[2], pContour)`,
                des: ` - создание сопряжения на контуре`,
                href: `https://c3d.ascon.ru/doc/math/group___algorithms__2_d.html#ga89deb3b8febcc1128905161999fa97ae`
            },           
            {                
                link: `MbArc* pArc = newMbArc(arcCenter, RADIUS, arrPnts[7], arrPnts[0], 1 /*initSense*/)`,
                des: ` – создаем арку на эскизе.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_arc.html`
            },
            {                
                link: `pContour->AddSegment(pArc)`,
                des: ` – отображение арки на эскизе.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_contour.html#af73017659948d7eedf9e18ecad031d60`                
            },
            {                
                link: `viewManager->AddObject(Style(1, RGB(0, 0, 255)), pContour, &pl)`,
                des: ` – отображение контура`,
                href: `https://c3d.ascon.ru/doc/math/class_render_container.html#a7d88739edf478f8c62a394b302863de8`
            },
            {                
                link: `::DeleteItem()`,
                des: ` - функция уменьшения счетчика ссылок динамически созданных объектов ядра.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_assembly.html#a1dede90dbdf6952021115fa319c377ca`
            }
        ]                 
    },
    {
        id: 3,
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
        `,
        links: [
            {                
                link: `MbCartPoint::Add(X, Y) - создание двумерной точки. X, Y –  координаты точек.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_cart_point.html#a730323c8cacf593c0719cbac98a709ae`
            }            
        ]                 
    },
    {
        id: 4,
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
        `,
        links: [
            {                
                link: `CreateSketch`,
                des: ` – пользовательская функция для создание эскиза.`,
                href: ``
            },
            {
                link: `MbResultType::ExtrusionSOlid `,
                des: `– функция создание модели выдавливания.`,
                href: `https://c3d.ascon.ru/doc/math/group___solid___modeling.html#ga33c85e210d286714dd4fa2f3072e47ea`
            },
            {
                link: `MbPlane`,
                des: ` - класс плоскости`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_plane.html`
            },
            {
                link: `MbCartPoint3D`,
                des: ` - класс точки в трехмерном пространстве`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_cart_point3_d.html`
            },
            {
                link: `MbVector3D`,
                des: ` - класс вектора в трехмерном пространстве`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_vector3_d.html`
            },
            {
                link: `MbSweptData`,
                des: ` - класс данных образующей`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_swept_data.html`
            },
            {
                link: `MbSNameMaker`,
                des: ` - класс для генерирования имен`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_s_name_maker.html`
            },
            {
                link: `MbSolid`,
                des: ` - класс твердого тела`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_solid.html`
            },
            {
                link: `MbResultType`,
                des: ` - класс для описания конечного результата`,
                href: `https://c3d.ascon.ru/doc/math/group___base___items.html#gad298d2af79e3480e59c381ffb111b0bc`
            }
        ]    
    },
    {
        id: 5,
        code: `
        void CreateSketch(RPArray<MbContour>& _arrContours)
        {
            // Создание массива точек квадрата, к которому в дальнейшем добавятся скругления.
            // Размер массива - 8 точек для учета точек четырех сегментов скруглений.
            SArray<MbCartPoint> arrPnts(4);
            arrPnts.Add(MbCartPoint(0, 0));
            arrPnts.Add(MbCartPoint(50, 0));
            arrPnts.Add(MbCartPoint(50, 50));
            arrPnts.Add(MbCartPoint(0, 50));
            // Построение единой ломаной внешнего контура по точкам
            MbPolyline* pPolyline = new MbPolyline(arrPnts, true);
            MbContour* pContourPolyline = new MbContour(*pPolyline, true);
            _arrContours.push_back(pContourPolyline);
        }
        void MakeUserCommand0()
        {
            // Множитель для преобразования угловых значений из градусов в радианы
            const double DEG_TO_RAD = M_PI / 180.0;
            // Локальная СК (по умолчанию совпадает с мировой СК)
            MbPlacement3D pl;
            // Вызов функции для построения образующей (из примера 4.1)
            RPArray<MbContour> arrContours;
            CreateSketch(arrContours);
            // Отображение образующей (в плоскости XY глобальной СК)
            for (int i = 0; i < arrContours.size(); i++)
                viewManager->AddObject(Style(1, RGB(0, 0, 255)), arrContours[i], &pl);
            // Подготовка параметров для вызова функции построения тела вращения.
            // sweptData - объект, в котором хранятся сведения об образующей.
            MbPlane* pPlaneXY = new MbPlane(MbCartPoint3D(0, 0, 0), MbCartPoint3D(1, 0, 0),
                MbCartPoint3D(0, 1, 0));
            MbSweptData sweptData(*pPlaneXY, arrContours);
            // Объект параметров для операции построения тела вращения.
            // Первые два параметра конструктора задают углы вращения в прямом и обратном
            // направлении (по нормали к образующей или противоположно этой нормали).
            // В данном примере вращение осуществляется на 120 градусов в прямом направлении.
            // Третий параметр задает форму топологии твердого тела.
            // При s = 0 строится тело с топологией сферы, при s = 1 - с топологией тора.
            // Если образующая - незамкнутая кривая, и ось вращения лежит в плоскости кривой,
            // то при s = 0 при построении образующая будет автоматически продлена до оси
            // вращения. В данном примере различий между значениями s нет, т.к. образующая
            // имеет вид замкнутого контура.
            RevolutionValues revParms(360 * DEG_TO_RAD, 0, 0);
            // Именователи для операции построения тела вращения и для контуров образующей
            MbSNameMaker operNames(1, MbSNameMaker::i_SideNone, 0);
            PArray<MbSNameMaker> cNames(0, 1, false);
            // Ось вращения для построения тела:
            // ось Y мировой СК смещается на -50 единиц вдоль оси X.
            MbAxis3D axis(pl.GetAxisY());
            // Вызов функции-утилиты для построения твердого тела вращения
            MbSolid* pSolid = NULL;
            MbResultType res = ::RevolutionSolid(sweptData, axis, revParms,
                operNames, cNames, pSolid);
            // Отображение построенного тела
            if (res == rt_Success)
                viewManager->AddObject(Style(1, LIGHTGRAY), pSolid);
            // Уменьшение счетчиков ссылок динамических объектов ядра
            ::DeleteItem(pSolid);
        }
        `,
        links: [
            {                
                link: `CreateSketch`,
                des: ` - пользовательская функция для создания эскиза`,
                href: ``
            },
            {
                link: `MbResultType::RevolutionSolid `,
                des: ` - функция для создания тела вращения`,
                href: `https://c3d.ascon.ru/doc/math/group___solid___modeling.html#ga5c53e0f25aa1f4ed1060ab22d77b24ee`
            },
            {
                link: `MbPolyline`,
                des: ` - класс для создания замкнутой кривой`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_polyline.html`
            },
            {
                link: `MbContour`,
                des: ` - класс для создания контура`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_contour.html`
            },
            {
                link: `MbAxis3D`,
                des: ` - класс для создания оси`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_axis3_d.html`
            },
            {
                link: `MbPlane`,
                des: ` - класс плоскости`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_plane.html`
            },
            {
                link: `MbCartPoint`,
                des: ` - класс точки в двухмерном пространстве`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_cart_point.html`
            },
            {
                link: `MbSweptData`,
                des: ` - класс данных образующей`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_swept_data.html`
            },
            {
                link: `MbSolid`,
                des: ` - класс твердого тела`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_solid.html`
            },
            {
                link: `MbSNameMaker`,
                des: ` - класс для генерирования имен`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_s_name_maker.html`
            },
            {
                link: `RevolutionValues`,
                des: ` - свойства вращения`,
                href: `https://c3d.ascon.ru/doc/math/class_revolution_values.html`
            },
            {
                link: `MbResultType`,
                des: ` - класс для описания конечного результата`,
                href: `https://c3d.ascon.ru/doc/math/group___base___items.html#gad298d2af79e3480e59c381ffb111b0bc`
            }            
        ]    
    },
    {
        id: 6,
        code: `
        void MakeUserCommand6() 
        {
            // Сферическая поверхность - построение по центру и радиусу
            MbSphereSurface* pSurf = new MbSphereSurface(MbCartPoint3D(50, 0, 0), 20);
            // Отображение поверхности
            viewManager->AddObject(Style(1, LIGHTGRAY), pSurf);
            // Уменьшение счетчика ссылок динамически созданных объектов ядра
            ::DeleteItem(pSurf);
            // Цилиндрическая поверхность - построение по трем точкам
            const MbCartPoint3D p0(50, 0, 0); // Центр локальной СК цилиндра (центр основания)
            const MbCartPoint3D p1(0, 20, 0); // Вектор p0-p1 задает ось Z локальной СК и высоту цилиндра
            const MbCartPoint3D p2(10, 0, 0); // Вектор p0-p2 задает ось X локальной СК и
            // радиус основания
            MbCylinderSurface* pSurf1 = new MbCylinderSurface(p0, p1, p2);
            // Отображение поверхности
            viewManager->AddObject(Style(1, LIGHTGRAY), pSurf1);
            // Уменьшение счетчика ссылок динамически созданных объектов ядра
            ::DeleteItem(pSurf1);
        // Коническая поверхность - конструктор по локальной системе координат,
        // радиусу, углу и высоте.
            const MbPlacement3D pl1; // Локальная СК совпадает с мировой
            const double radius = 0; // Радиус в плоскости XY локальной СК
            // (если 0 - строится коническая поверхность конуса, если >0 - строится поверхность усеченного конуса)
            // Угол между осью Z локальной СК и боковой образующей
            const double angle = 22.5 * M_PI / 180.0;
            const double height = 10; // Высота конуса (вдоль оси Z)
            MbConeSurface* pSurf2 = new MbConeSurface(pl1, radius, angle, height);
            // Отображение поверхности
            viewManager->AddObject(Style(1, LIGHTGRAY), pSurf2);
            // Уменьшение счетчика ссылок динамически созданных объектов ядра
            ::DeleteItem(pSurf2);
            // Тороидальная поверхность: конструктор по локальной СК и двум радиусам
        // Ось Z локальной СК является осью вращательной симметрии торической поверхности
            const MbPlacement3D pl2; // Локальная СК совпадает с мировой.
            const double radius1 = 10; // Радиус центров трубки тора
            const double radius2 = 3; // Радиус трубки тора
            MbTorusSurface* pSurf3 = new MbTorusSurface(pl2, radius1, radius2);
            // Отображение поверхности
            viewManager->AddObject(Style(1, LIGHTGRAY), pSurf3);
            // Уменьшение счетчика ссылок динамически созданных объектов ядра
            ::DeleteItem(pSurf3);
        }
        `,
        links: [
            {                
                link: `CreateSketch`,
                des: ` - пользовательская функция для создания эскиза`,
                href: ``
            },
            {
                link: `MbResultType::ExtrusionSolid`,
                des: ` - функция создания модели выдавливания`,
                href: `https://c3d.ascon.ru/doc/math/group___solid___modeling.html#ga33c85e210d286714dd4fa2f3072e47ea`
            },
            {
                link: `MbPolyline`,
                des: ` - класс для создания замкнутой кривой`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_polyline.html`
            },
            {
                link: `MbContour`,
                des: ` - класс для создания контура`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_contour.html`
            },
            {
                link: `MbPlane`,
                des: ` - класс плоскости`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_plane.html`
            },
            {
                link: `MbArc`,
                des: ` - класс дуги`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_arc.html`
            },
            {
                link: `MbCartPoint3D`,
                des: ` - класс точки в трехмерном пространстве`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_cart_point3_d.html`
            },
            {
                link: `MbVector3D`,
                des: ` - класс вектора в трехмерном пространстве`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_vector3_d.html`
            },
            {
                link: `MbSolid`,
                des: ` - класс твердого тела`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_solid.html`
            },
            {
                link: `MbSweptData`,
                des: ` - класс данных образующей`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_swept_data.html`
            },
            {
                link: `MbSNameMaker`,
                des: ` - класс для генерирования имен`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_s_name_maker.html`
            },
            {
                link: `MbResultType`,
                des: ` - класс для описания конечного результата`,
                href: `https://c3d.ascon.ru/doc/math/group___base___items.html#gad298d2af79e3480e59c381ffb111b0bc`
            }                  
        ]    
    },
    {
        id: 7,
        code: `
        void CreateSketch (RPArray<MbSurface>& _arrSurfaces, RPArray<MbContour>& _arrContours, double vert,double hor, 
            double OFS_X, double OFS_Y, double OFS_Z, double d)
        {
        double l = d * 0.4472138576667362;
        SArray<MbCartPoint>arrPnts(4);
        arrPnts.Add(MbCartPoint(-l / 2, l));
        arrPnts.Add(MbCartPoint(l / 2, l));
        arrPnts.Add(MbCartPoint(-l / 2, -l));
        arrPnts.Add(MbCartPoint(l / 2, -l));
        MbLineSegment* pS1 = new MbLineSegment(arrPnts[0], arrPnts[1]);
        MbContour* pContour = new MbContour(*pS1, true);
        MbArc* pArc1 = new MbArc(MbCartPoint(0, 0), arrPnts[1], arrPnts[3], 0);
        pContour->AddSegment(pArc1);
        MbLineSegment* pS2 = new MbLineSegment(arrPnts[3], arrPnts[2]);
        pContour->AddSegment(pS2);
        MbArc* pArc2 = new MbArc(MbCartPoint(0, 0), arrPnts[2], arrPnts[0], 0);
        pContour->AddSegment(pArc2);
        MbPlacement3D plSurf(MbCartPoint3D(0 + OFS_X, 0 + OFS_Y, 0 + OFS_Z),
        MbCartPoint3D(hor + OFS_X, vert + OFS_Y, 0 + OFS_Z),
        MbCartPoint3D(0 + OFS_X, 0 + OFS_Y, 1 + OFS_Z));
        MbSurface* pSurf1 = new MbPlane(plSurf);
        _arrSurfaces.push_back(pSurf1);
        _arrContours.push_back(pContour);
        }
        void MakeUserCommand0()
        {
        // Получение образующей в виде массивов поверхностей и контуров на них с помощью
        // вспомогательной функции.
        RPArray<MbSurface> arrSurfaces;
        RPArray<MbContour> arrContours;
        CreateSketch(arrSurfaces, arrContours, 0, 1, 30, 55, 0, 12);
        CreateSketch(arrSurfaces, arrContours, 0, 1, 30, 40, 0, 12);
        CreateSketch(arrSurfaces, arrContours, 0, 1, 40, 23, 0, 15);
        CreateSketch(arrSurfaces, arrContours, 1, 0, 22, 10, 0, 15);
        CreateSketch(arrSurfaces, arrContours, 0, 1, 5, 25, 0, 10);
        CreateSketch(arrSurfaces, arrContours, 0, 1, 5, 30, 0, 3);
        // Объект с параметрами операции заметания.
        LoftedValues params;
        // Объекты для именования элементов модели твердого тела.
        MbSNameMaker names(ct_CurveLoftedSolid, MbSNameMaker::i_SideNone, 0);
        PArray<MbSNameMaker> contourNames(0, 1, false);
        // Построение твердого тела заметания
        MbSolid* pSolid = NULL;
        MbResultType res = ::LoftedSolid(arrSurfaces, arrContours, NULL, params,
        NULL, NULL, names, contourNames, pSolid);
        // Отображение построенного тела
        if (res == rt_Success)
        viewManager->AddObject(Style(1, LIGHTGRAY), pSolid);
        // Уменьшение счетчика ссылок тела
        ::DeleteItem(pSolid);
        }
        `,
        links: [
            {                
                link: `CreateSketch`,
                des: ` - пользовательская функция для создания эскиза`,
                href: ``
            },
            {
                link: `MbResultType::LoftedSolid`,
                des: ` - функция построения тела заметания`,
                href: `https://c3d.ascon.ru/doc/math/group___solid___modeling.html#gad7916b9ed767a896152b27a35b5301ca`
            },
            {
                link: `MbArc`,
                des: ` - класс дуги`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_arc.html`
            },
            {
                link: `MbPlacement3D`,
                des: ` - класс локальной системы координат в трехмерном пространстве`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_placement3_d.html`
            },
            {
                link: `MbCartPoint3D`,
                des: ` - класс точки в трехмерном пространстве`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_cart_point3_d.html`
            },
            {
                link: `MbSurface`,
                des: ` - класс поверхности в трехмерном пространстве`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_surface.html`
            },
            {
                link: `MbSolid`,
                des: ` - класс твердого тела`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_solid.html`
            },
            {
                link: `MbSNameMaker`,
                des: ` - класс для генерирования имен`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_s_name_maker.html`
            }

        ]    
    },
    {
        id: 8,
        code: `
        void CreateSketch(RPArray<MbContour>& _arrContours)
        {
            const double RAD_OUTER = 35.0; // Радиус внешней окружности
            const double RAD_INNER = 30.0; // Радиус внутренней окружности
            MbArc* pCircleExt = new MbArc(MbCartPoint(0, 0), RAD_OUTER);
            MbArc* pCircleInt = new MbArc(MbCartPoint(0, 0), RAD_INNER);
            _arrContours.push_back(new MbContour(*pCircleExt, true));
            _arrContours.push_back(new MbContour(*pCircleInt, true));
        }
        void MakeUserCommand0()
        {
            // Локальная СК (по умолчанию совпадает с мировой СК)
            MbPlacement3D pl;
            // Массив контрольных точек для построения NURBS-сплайна
            std::vector<MbCartPoint3D> vecPnts = { { 0, 0, 0 }, { 0, 0, 150 } };
            SArray<MbCartPoint3D> arrPnts(vecPnts);
            // Построение направляющей кривой в виде незамкнутого NURBS-сплайна
            // 2-го порядка по контрольным точкам
            MbNurbs3D* pSpline = MbNurbs3D::Create(2, arrPnts, false);
            // Описание образующей кривой в виде плоского контура на плоскости XY мировой СК
            MbPlane* pPlaneXY = new MbPlane(MbCartPoint3D(0, 0, 0), MbCartPoint3D(1, 0, 0),
                MbCartPoint3D(0, 1, 0));
            // Построение образующей кривой с помощью вспомогательной функции CreateSketch
            RPArray<MbContour> arrContours;
            CreateSketch(arrContours);
            MbSweptData sweptData(*pPlaneXY, arrContours);
            // Объект с параметрами операции построения тела заметания
            EvolutionValues params;
            // Вариант плоскопараллельного движения образующей вдоль направляющей
            params.parallel = 0;
            // Служебные объекты-именователи для вызова геометрической операции
            MbSNameMaker operNames(ct_CurveEvolutionSolid, MbSNameMaker::i_SideNone, 0);
            MbSNameMaker cNames(ct_CurveSweptSolid, MbSNameMaker::i_SideNone, 0);
            PArray<MbSNameMaker> contourNames(1, 0, false);
            contourNames.Add(&cNames);
            MbSNameMaker splineNames(ct_CurveSweptSolid, MbSNameMaker::i_SideNone, 0);
            // Вызов операции построения тела заметания
            MbSolid* pSolid = NULL;
            MbResultType res = ::EvolutionSolid(sweptData, *pSpline, params, operNames,
                contourNames, splineNames, pSolid);
            // Отображение построенного тела
            if (res == rt_Success)
                viewManager->AddObject(Style(1, LIGHTGRAY), pSolid);
            // Отображение направляющей кривой со смещением вдоль оси Y (в целях отображения,
            // чтобы отображаемая кривая была смещена от поверхности тела).
            pSpline->Move(MbVector3D(MbCartPoint3D(0, 0, 0), MbCartPoint3D(0, -50, 0)));
            viewManager->AddObject(Style(3, RGB(0, 0, 255)), pSpline, &pl);
            // Уменьшение счетчиков ссылок объектов ядра
            ::DeleteItem(pSolid);
            ::DeleteItem(pPlaneXY);
            ::DeleteItem(pSpline);
        }
        `,
        links: [
            {                
                link: `MbCartPoint::Add(X, Y) - создание двумерной точки. X, Y –  координаты точек.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_cart_point.html#a730323c8cacf593c0719cbac98a709ae`
            }            
        ]    
    },
    {
        id: 9,
        code: `
        void CreateSketch01( RPArray<MbContour>& _arrContours)
        {
            double R = 70;
            double l = 7;
            SArray<MbCartPoint>arrPnts(4);
            arrPnts.Add(MbCartPoint(-l*0.5 , l+R));
            arrPnts.Add(MbCartPoint(l*0.5 , l+R));
            arrPnts.Add(MbCartPoint(l , -l+R));
            arrPnts.Add(MbCartPoint(-l , -l+R));

            MbLineSegment* pS1 = new MbLineSegment(arrPnts[0], arrPnts[1]);
            MbContour* pContour = new MbContour(*pS1, true);

            MbLineSegment* pS2 = new MbLineSegment(arrPnts[1], arrPnts[2]);
            pContour->AddSegment(pS2);

            MbLineSegment* pS3 = new MbLineSegment(arrPnts	[2], arrPnts[3]);
            pContour->AddSegment(pS3);

            MbLineSegment* pS4 = new MbLineSegment(arrPnts[3], arrPnts[0]);
            pContour->AddSegment(pS4);
        
            _arrContours.push_back(pContour);
        }

        void CreateSketch02(RPArray<MbContour>& _arrContours)
        {
            // Построение образующей в виде двух концентрических окружностей

                const double RAD_EXT = 66.0; // Радиус внешней окружности
            const double RAD_INT = 33.0; // Радиус внутренней окружности
            MbArc* pCircleExt = new MbArc(MbCartPoint(0, 0), RAD_EXT);
            MbArc* pCircleInt = new MbArc(MbCartPoint(0, 0), RAD_INT);
            _arrContours.push_back(new MbContour(*pCircleExt, true));
            _arrContours.push_back(new MbContour(*pCircleInt, true));
        }

        void MakeUserCommand0() 
        {
            
            // Локальная СК (по умолчанию совпадает с мировой СК)
            MbPlacement3D pl;
            
            // Построение направляющей кривой в виде незамкнутого NURBS-сплайна
            // 4-го порядка по контрольным точкам
            MbConeSpiral* pSpiral = new MbConeSpiral(MbCartPoint3D(0, 0, 0), MbCartPoint3D(100, 0, 0),
                MbCartPoint3D(0,100, 0),20,false);


        
            // Описание образующей кривой в виде плоского контура на плоскости XY мировой СК
            MbPlane* pPlaneXY = new MbPlane(MbCartPoint3D(0, 0, 0), MbCartPoint3D(100, 0, 0),
                MbCartPoint3D(0, 100, 0));
            // Построение образующей кривой с помощью вспомогательной функции CreateSketch
        
            RPArray<MbContour> arrContours;
            CreateSketch01( arrContours);
            MbSweptData sweptData(*pPlaneXY, arrContours);

            // Объект с параметрами операции построения тела заметания
            EvolutionValues params;
            // Вариант плоскопараллельного движения образующей вдоль направляющей
            params.parallel = 1;
            // Служебные объекты-именователи для вызова геометрической операции
            MbSNameMaker operNames(ct_CurveEvolutionSolid, MbSNameMaker::i_SideNone, 0);
            MbSNameMaker cNames(ct_CurveSweptSolid, MbSNameMaker::i_SideNone, 0);
            PArray<MbSNameMaker> contourNames(1, 0, false);
            contourNames.Add(&cNames);
            MbSNameMaker splineNames(ct_CurveSweptSolid, MbSNameMaker::i_SideNone, 0);
            // Вызов операции построения тела заметания
            MbSolid* pSolid = NULL;
            MbResultType res = ::EvolutionSolid(sweptData, *pSpiral, params, operNames,
                contourNames, splineNames, pSolid);
            // Отображение построенного тела
            viewManager->AddObject(Style(1, LIGHTGRAY), pSolid);
            if (res == rt_Success)
                viewManager->AddObject(Style(1, LIGHTGRAY), pSolid);
        

            //выдавливание цилиндра

            MbPlane* pPlaneXY2 = new MbPlane(MbCartPoint3D(0, 0, 0), MbCartPoint3D(0, 100, 0),
                MbCartPoint3D(0, 0, 100));

            RPArray<MbContour> arrContours2;
            CreateSketch02(arrContours2);
            MbSweptData sweptData2(*pPlaneXY2, arrContours2);

            // Направляющий вектор для операции выдавливания
            MbVector3D dir(1, 0, 0);

            // Параметры операции выдавливания, задающие свойства тела для построения в прямом
            // и в обратном направлении вдоль (глубина выдавливания и уклон).
            const double HEIGHT_FORWARD = 108.0, HEIGHT_BACKWARD = 8.0;
        
            ExtrusionValues extrusionParams(HEIGHT_FORWARD, HEIGHT_BACKWARD);
        

            // Именователи элементов модели твердого тела и контуров образующей
            MbSNameMaker operNames2(1, MbSNameMaker::i_SideNone, 0);
            PArray<MbSNameMaker> cNames2(0, 1, false);

            // Вызов функции-утилиты для построения твердого тела выдавливания
            MbSolid* pSolid2 = NULL;
            MbResultType res2 = ::ExtrusionSolid(sweptData2, dir, NULL, NULL, false,
                extrusionParams, operNames2, cNames2, pSolid2);
            viewManager->AddObject(Style(1, LIGHTGRAY), pSolid2);
            // Отображение построенного тела
            if (res2 == rt_Success)
            {
                // Смещение тела по оси Y, чтобы при отображении оно не накладывалось на образующую
            // pSolid->Move(MbVector3D(0, 0, 0));
                viewManager->AddObject(Style(1, LIGHTGRAY), pSolid2);
            }

            // Уменьшение счетчиков ссылок динамически созданных объектов ядра
            ::DeleteItem(pSolid2);
            ::DeleteItem(pSolid);
            ::DeleteItem(pPlaneXY);
            ::DeleteItem(pSpiral);
        }
        `,
        links: [
            {                
                link: `MbCartPoint::Add(X, Y) - создание двумерной точки. X, Y –  координаты точек.`,
                href: `https://c3d.ascon.ru/doc/math/class_mb_cart_point.html#a730323c8cacf593c0719cbac98a709ae`
            }            
        ]    
    }
  ]    
}
