const scores = [
    {"name":"Hannes","score":8000},
    {"name":"Daníel","score":7500},
    {"name":"Óskar","score":5000},
    {"name":"Andri","score":4500},
    {"name":"Jói","score":2500}
];

const rows = [];
const min = document.getElementById("min");
const max = document.getElementById("max");
const scoreBoard = document.getElementById("scoreboard");

function makeRows() {
    for (let i = 0; i < scores.length; i++) {
        let row = document.createElement("tr");
        let name = document.createElement("td");
        let score = document.createElement("td");
        
        name.textContent = scores[i].name;
        score.textContent = scores[i].score;
        
        row.append(name,score);

        rows.push({"score":scores[i],"element":row});
    }
}

function appendRows() {
    let tbody = document.createElement("tbody");
    for (let i = 0; i < rows.length; i++) {
        tbody.append(rows[i].element);
    }
    scoreBoard.append(tbody);
}

function update(values) {
    let minVal = Number(values[0]);
    let maxVal = Number(values[1]);
    rows.forEach(function(row) {
        if (row.score.score >= minVal && row.score.score <= maxVal) {
            row.element.style = "display: table-row";
        } else {
            row.element.style = "display: none";
        }
    }
    );
    min.value = minVal;
    max.value = maxVal;
}

const slider = document.getElementById("slider");

noUiSlider.create(slider, {
    start: [2000,8000],
    step: 500,
    connect: true,
    range: {
        "min": 0,
        "max":10000
    }

});

slider.noUiSlider.on("update",function() {update(slider.noUiSlider.get())});

min.addEventListener("input",(function() {
    slider.noUiSlider.set([min.value,null]);
}))

max.addEventListener("input",(function() {
    slider.noUiSlider.set([null,max.value])
}))

makeRows();
appendRows();
update(slider.noUiSlider.get());