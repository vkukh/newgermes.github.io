'use strict';
(function() {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: ["Март", "Апрель 46%", "Май 109%", "Июнь 236%", "Июль 96%", "Август 51%", "Сентябрь 19%", "Октябрь 40%", "Ноябрь 19%", "Декабрь 5%"],
            datasets: [{
                label: "Общий трафик 7 проектов",
                backgroundColor: '#1e926b',
                borderColor: '#04245d',
                data: [15, 22, 46, 155, 305, 462, 550, 771, 920, 968], // general
                //         46  109 236  96   51   19   40   19   5   

                // [2, 4, 28, 83, 117, 171, 228, 318, 353, 377] braindislab.com
                // [2, 2, 2,  5,   33, 75,  88,  102, 118, 135] infectionlab.com
                // [1, 2, 1,  1,   2,  4,   9,   54,  99,  103] cordislab.com
                // [3, 3, 2,  3,   12, 25,  21,  28,  34,  42] extrababka.com
                // [2, 3, 2,  7,   19, 29,  38,  63,  80,  74] nerveslab.com
                // [3, 5, 5,  31,  69, 86,  98,  116, 128, 121] dailymama.net
                // [2, 3, 6,  25,  53, 72,  68,  90,  108, 116] skindislab.com
                fill: false
            }]
        },
        // Configuration options go here
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Показатели роста посещаемости c 03.2017 по 12.2017'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },

        }
    });
}());