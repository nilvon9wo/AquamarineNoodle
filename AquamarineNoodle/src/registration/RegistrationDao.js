"use strict";
var RegistrationDao = (function () {
    function RegistrationDao() {
        this.registrations = new Array();
        this.registrations.push({ salutation: "Mr.", name: "Tom Tailor", age: 20 }, { salutation: "Mr.", name: "Max Muster", age: 19 });
    }
    RegistrationDao.prototype.getAll = function () {
        console.log('$$$$ RETURN this.registrations', this.registrations);
        return this.registrations;
    };
    RegistrationDao.prototype.add = function (registraction) {
        this.registrations.push(registraction);
    };
    return RegistrationDao;
}());
exports.__esModule = true;
exports["default"] = RegistrationDao;
