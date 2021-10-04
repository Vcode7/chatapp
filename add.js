const fs = require('fs');

function AddData(mes){
    fs.writeFileSync('path.html', mes);
}
export default AddData();