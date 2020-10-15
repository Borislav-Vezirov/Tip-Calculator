(function () {

    const select = [{
            value: 1,
            title: 'Great - 20%'
        },
        {
            value: 2,
            title: 'Good - 10%'
        },
        {
            value: 1,
            title: 'Bad - 2%'
        }
    ];

    select.forEach((optionSelect) => {
        const option       = document.createElement('option');
        option.textContent = optionSelect.title;
        option.value       = optionSelect.value;
        const select       = document.getElementById('service');

        select.appendChild(option);
    });

    document.getElementById('form').addEventListener('submit', (e) => {  

        e.preventDefault();

        let   bill          = document.querySelector('#bill').value,
              sharingPeople = document.querySelector('#sharingPeople').value,
              service       = document.querySelector('#service').value;

        if (bill === "" || bill <= "0" || sharingPeople <= "0" || service === "0") {

            let alertMessage = document.createElement('div');

            alertMessage.className = "col-sm-11 mx-auto alert alert-danger text-center p-auto";

            alertMessage.appendChild(document.createTextNode(`Error...Please make sure all the fields are correctly fill`));

            let container = document.getElementById('form');

            let label = document.getElementById("label");

            container.insertBefore(alertMessage, label);

            setTimeout( () => {
                document.querySelector('.alert').remove();
            }, 5000);
        } else {

            const loader      = document.querySelector('#img'),
                  result      = document.querySelector('.result'),
                  tipAmount   = document.querySelector('#tipAmount'),
                  totalAmount = document.querySelector('#totalAmount'),
                  personOwes  = document.querySelector('#personOwes');

            const resultDom = calculateTip(bill, sharingPeople, service);

            loader.classList.add("showResult");

            setTimeout(() => {

                loader.remove();

                tipAmount.textContent   = `${resultDom[0].toFixed(2)}`;
                totalAmount.textContent = `${resultDom[1].toFixed(2)}`;
                personOwes.textContent  = `${resultDom[2].toFixed(2)}`;

                result.classList.add('showResult');

            }, 1500);
        }
    });

    const calculateTip = (bill, sharingPeople, service) => {

        let percentTip

        if (service === 1) {
            percentTip = 0.2;
        } else if (service === 2) {
            percentTip = 0.1;
        } else {
            percentTip = 0.02;
        }

        const tipAmount   = Number(bill) * percentTip,
              totalAmount = Number(bill) + percentTip,
              personOwes  = totalAmount / Number(sharingPeople);

        return [tipAmount, totalAmount, personOwes];

    }
})();