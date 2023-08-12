let addValuesBtn = document.getElementById('submit');
let lineName = document.getElementById('lineName');
let lineLength = document.getElementById('lineLength');
let angle = document.getElementById('angle');

let bearing = document.getElementById('bearing');

let north = document.getElementById('north');
let east = document.getElementById('east');
// let degree = document.getElementById('degree');
// let minutes = document.getElementById('minutes');
// let seconds = document.getElementById('seconds');

let fileName = document.getElementById('fileName');
let fileExtension = document.getElementById('fileExtension');

let container = document.getElementById('container');

let addBearingBtn = document.getElementById('addBearing');

let addANorthEastBtn = document.getElementById('addANorthEast');

let resetBtn = document.getElementById('resetBtn');

let saveBtn = document.getElementById('saveBtn');

addValuesBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    eel.addLine(lineName.value, lineLength.value, angle.value);
    lineName.value = '';
    lineLength.value = '';
    angle.value = '';
    container.innerHTML = '';
    container.innerHTML += `
                <div class="row">
                    <div class="header">line name</div>
                    <div class="header">length</div>
                    <div class="header">angle</div>
                    <div class="header">bearing</div>
                    <div class="header">latitude</div>
                    <div class="header">departure</div>
                    <div class="header">correct latitude</div>
                    <div class="header">correct departure</div>
                    <div class="header">north</div>
                    <div class="header">east</div>
                </div>
    `
    let len = await eel.getData()();
    for(let i = 0; i < len[0].length; i++){
        let data = await eel.getData()();
        console.log(data);
        container.innerHTML += `<div class="row">
                                    <div>${data[0][i]}</div>
                                    <div>${data[1][i][0]}</div>
                                    <div>${data[1][i][1]}</div>
                                    <div class="transparency"></div>
                                    <div class="transparency"></div>
                                    <div class="transparency"></div>
                                    <div class="transparency"></div>
                                    <div class="transparency"></div>
                                    <div class="transparency"></div>
                                    <div class="transparency"></div>
                                </div>`
    }
})

addBearingBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await eel.addBearing(bearing.value);
    bearing.value = "";
    container.innerHTML = '';
    container.innerHTML += `
                <div class="row">
                    <div class="header">line name</div>
                    <div class="header">length</div>
                    <div class="header">angle</div>
                    <div class="header">bearing</div>
                    <div class="header">latitude</div>
                    <div class="header">departure</div>
                    <div class="header">correct latitude</div>
                    <div class="header">correct departure</div>
                    <div class="header">north</div>
                    <div class="header">east</div>
                </div>
    `
    let len = await eel.getData()();
    for(let i = 0; i < len[0].length; i++){
        let data = await eel.getData()();
        console.log(data);
        container.innerHTML += `<div class="row">
                                    <div>${data[0][i]}</div>
                                    <div>${data[1][i][0]}</div>
                                    <div>${data[1][i][1]}</div>
                                    <div>${data[2][i]}</div>
                                    <div>${data[3][i]}</div>
                                    <div>${data[4][i]}</div>
                                    <div>${data[5][i]}</div>
                                    <div>${data[6][i]}</div>
                                    <div class="transparency"></div>
                                    <div class="transparency"></div>
                                </div>`
    }
    container.innerHTML += `<div class="row">
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="result">${len[9][0]}</div>
                                <div class="result">${len[9][1]}</div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                            </div>`
})

addANorthEastBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await eel.addANorthEast(north.value, east.value);
    north.value = "";
    east.value = "";
    container.innerHTML = '';
    container.innerHTML += `
                <div class="row">
                    <div class="header">line name</div>
                    <div class="header">length</div>
                    <div class="header">angle</div>
                    <div class="header">bearing</div>
                    <div class="header">latitude</div>
                    <div class="header">departure</div>
                    <div class="header">correct latitude</div>
                    <div class="header">correct departure</div>
                    <div class="header">north</div>
                    <div class="header">east</div>
                </div>
            `
    let len = await eel.getData()();
    for(let i = 0; i < len[0].length; i++){
        let data = await eel.getData()();
        console.log(data);
        container.innerHTML += `<div class="row">
                                    <div>${data[0][i]}</div>
                                    <div>${data[1][i][0]}</div>
                                    <div>${data[1][i][1]}</div>
                                    <div>${data[2][i]}</div>
                                    <div>${data[3][i]}</div>
                                    <div>${data[4][i]}</div>
                                    <div>${data[5][i]}</div>
                                    <div>${data[6][i]}</div>
                                    <div>${data[7][i]}</div>
                                    <div>${data[8][i]}</div>
                                </div>`
    }
    container.innerHTML += `<div class="row">
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                                <div class="result">${len[9][0]}</div>
                                <div class="result">${len[9][1]}</div>
                                <div class="transparency"></div>
                                <div class="transparency"></div>
                            </div>`
    // let resultData = await eel.seeResult()();
    // container.innerHTML += `<div class="result">${resultData[0][0][0]}</div>
    // <div class="result">${resultData[0][0][1]}</div>
    // <div class="azimuth result">°${resultData[0][0][2]} '${resultData[0][0][3]} "${resultData[0][0][4]}</div>
    // <div class="result">${resultData[0][1][0]}</div>
    // <div class="result">${resultData[0][1][1]}</div>`
    
    // container.innerHTML += `<div class="transparency"></div>
    // <div class="transparency"></div>
    // <div class="transparency azimuth"></div>
    // <div class="sum">${resultData[1]}</div>
    // <div class="sum">${resultData[2]}</div>`

})

resetBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    container.innerHTML = '';
    container.innerHTML += `
                <div class="row">
                    <div class="header">line name</div>
                    <div class="header">length</div>
                    <div class="header">angle</div>
                    <div class="header">bearing</div>
                    <div class="header">latitude</div>
                    <div class="header">departure</div>
                    <div class="header">correct latitude</div>
                    <div class="header">correct departure</div>
                    <div class="header">north</div>
                    <div class="header">east</div>
                </div>
    `
    await eel.reset()();
})

saveBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await eel.save(fileName.value, fileExtension.value);
    fileName.value = ''
    fileExtension.value = 'xls'
})
