(function() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
    
        // The data for our dataset
        data: {
            labels: ["Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            datasets: [{
                label: "braindislab.com",
                backgroundColor: '#1e926b',
                borderColor: '#04245d',
                data: [2, 4, 28, 83, 117, 171, 228, 318, 353, 377],
                fill: false
            }]
        },
    
        // Configuration options go here
        options: {
            responsive: true,
            title:{
                display:true,
                text:'Показатели роста посещаемости c 03.2017 по 12.2017'
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
} ());