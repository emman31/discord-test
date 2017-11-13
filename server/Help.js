function Help(sheet) {
    console.log("Loaded " + sheet.title);

    this._texts = {};
    var self = this;
    var rows = sheet.getRows({offset:1, limit:20}, function(err, rows) {
        if (err) {
            console.log(err);
        }
        console.log("Read " + rows.length + " rows.");

        for(var i = 0; i < rows.length; i++) {
            self._texts[rows[i].subject] = rows[i].help;
            console.log("row " + i + ": " + rows[i].subject + "," + rows[i].help);
        }
    });

}

Help.prototype.GetString = function GetString(key) {
    return this._texts[key];
}

module.exports = Help;