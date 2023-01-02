$.get('http://localhost:5000/plans')
    .done((result) => {
        let f = document.getElementsByTagName('div')[2];
        for (let i in result) {

            let div = document.createElement('div');
            div.className = 'columns';
            let ul = document.createElement('ul');
            ul.className = 'price';
            let li = document.createElement('li');
            li.className = 'header';
            li.innerHTML = result[i].name;
            ul.appendChild(li);

            if (result[i].name == "Free Plan") {
                let li = document.createElement('li');
                li.className = 'grey';
                li.innerHTML = `Free of charge`;
                ul.appendChild(li);
            } else {
                let li = document.createElement('li');
                li.className = 'grey';
                li.innerHTML = `$ ${result[i].prices.month.amount} per month  
                                <br>
                                <b>OR</b> 
                                <br>
                                $ ${result[i].prices.year.amount} per year`;
                ul.appendChild(li);
            }

            let li3 = document.createElement('li');

            li3.innerHTML = `Seats: ${result[i].seats} 
                            <br> 
                            Credits: ${result[i].credits}`

            // counter = counter + 1;
            ul.appendChild(li3);
            let buttonsDiv = document.createElement('div');
            buttonsDiv.className = 'buttonsDiv';

            if (result[i].name == "Free Plan") {
                let input = document.createElement('input');
                buttonsDiv.className = 'buttonsDivSelected';
                input.className = 'button';
                input.id = 'selected';
                input.type = 'submit';
                input.value = 'selected';
                input.name = i;
                buttonsDiv.appendChild(input);
                ul.appendChild(buttonsDiv);
                div.appendChild(ul);
                f.appendChild(div);
            } else {
                let input1 = document.createElement('input');
                input1.className = 'button';
                input1.type = 'submit';
                input1.value = 'month';
                input1.name = i;
                buttonsDiv.appendChild(input1);
                ul.appendChild(buttonsDiv);
                div.appendChild(ul);
                f.appendChild(div);
                let input2 = document.createElement('input');
                input2.name = i;
                input2.className = 'button';
                input2.type = 'submit';
                input2.value = 'year';
                buttonsDiv.appendChild(input2);
                ul.appendChild(buttonsDiv);
                div.appendChild(ul);
                f.appendChild(div);
            }
        }
        $('input[type="submit"]').click((e) => {
            let productId = e.target.name;
            let productJson = {};
            productJson.id = productId;
            productJson.quantity = 1;
            $.post('http://localhost:5000/plans', productJson)
                .done((link) => {
                    window.location.replace(link);
                })

        })
    })





