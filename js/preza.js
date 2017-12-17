(function() {
    const STOP = 333000; // сумма вложений
    const app = document.querySelector('#app');
    const input = document.querySelector('input');

    let etalon = 85000; // выход в ноль
    let newTraffic = 85000;
    let delta = 10; // 10%
    let re = 0;
    let sum = 0;
    let month = 1;
    let res = '';

    function getRes(delta) {
        res = '';

        while (sum < STOP) {
            newTraffic += newTraffic * delta;
            re = newTraffic * 22500 / etalon - 22500;
            sum += re;
    
            res += `<p><b>Месяц ${month}:</b> ${newTraffic.toFixed(0)} пользователей; <b>Месячная прибыль:</b> ${re.toFixed(0)} $; <b>Чистая суммарная прибыль:</b> ${sum.toFixed(0)} $</p>`;
            // console.log(`Месяц ${month}: ${newTraffic.toFixed(0)} пользователей; Месячная прибыль: ${re.toFixed(0)} $; Суммарная прибыль: ${sum.toFixed(0)} $`);
            month++;
        }
        newTraffic = 85000;
        re = 0;
        sum = 0;
        month = 1;

        return res;
    }


    input.addEventListener('change', e => {
        console.log(input.value);
        app.innerHTML = getRes(input.value / 100);
    });
} ());