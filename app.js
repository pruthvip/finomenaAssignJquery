'use strict';


// Page specific code

function TableHandler() {

    let noOfRows = 5;
    let noOfCols = 3;

    var inputValues = [];

    function tableRowTemplate(i) {

        let colHtml = '';
        for (let j=0; j <= noOfCols; j++) {
            colHtml = colHtml +
                    `
                <div class="display-td">
                    <input type="number" data-row=${i} data-col=${j} />
                </div>
               `;
        }

        return (
            `<div class="display-t">
            ${colHtml}
                </div>`
        );
    }


    function caluculateTheAnswers() {

        // fill the last column first
        const inputsCols = $('*[data-col="3"]');

        for (let i = 0; i < inputsCols.length - 1; i++) {
            const element = $(inputsCols[i])[0];

            const row = parseInt(element.getAttribute('data-row'), 10);

            const requiredValues = inputValues[row];

            let answer;

            let product = requiredValues[0] * requiredValues[1] || 0;

            answer = product  + requiredValues[2] || 0;

            if (i === 0) {
                console.log(requiredValues)
            }

            element.value = answer;
        }



        // fill the last row

        const lastRowInput = $('*[data-row="5"]');


        for (let j = 0; j < lastRowInput.length; j++) {
            const element = $(lastRowInput[j])[0];

            const col = parseInt(element.getAttribute('data-col'), 10);

            let answer = 0;

            for (let num = 0; num < noOfRows; num++) {
                if (inputValues[num][col]!== null) {
                    answer =answer + inputValues[num][col];
                }
            }

            element.value = answer;
        }
    }


    function _bindClickEvents() {

        $('input').on('change', function(e){
            const row = parseInt(e.currentTarget.getAttribute('data-row'), 10);
            const col = parseInt(e.currentTarget.getAttribute('data-col'), 10);

            inputValues[row][col] = parseInt(e.target.value, 10);

            caluculateTheAnswers();
        })
    }



    function _render() {
        let rowHtml = '';

        for (let i=0; i <= noOfRows; i++) {
            rowHtml = rowHtml +
                `${tableRowTemplate(i)}
               `;

        }


        document.getElementById('app').innerHTML = rowHtml;
    }

    function _initialize() {
        for (let i = 0; i < noOfRows; i++) {
            const temp = [];
            for (let j =0; j < noOfCols; j++)
                {
                    temp.push(null);
                }
                inputValues.push(temp);
        }
    }


    return {
        init: function () {

            _initialize();

            // call render
            _render();

            // bind click events

            _bindClickEvents();
        }
    };
}

// secure window objects


// start rendering the page
const Table = TableHandler();

Table.init();
