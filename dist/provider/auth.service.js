"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const auth_1 = require("firebase/auth");
let AuthService = class AuthService {
    constructor() {
        this.result = {
            message: '',
            result: '',
        };
    }
    async Email_login(body) {
        const auth = (0, auth_1.getAuth)();
        await (0, auth_1.signInWithEmailAndPassword)(auth, body.email, body.password)
            .then((userCredential) => {
            this.result.message = 'Successful';
            this.result.result = userCredential.user.stsTokenManager.accessToken;
            console.log(userCredential.user.stsTokenManager);
        })
            .catch((error) => {
            this.result.message = error.code;
            this.result.result = '';
        });
        return this.result;
    }
    async Anonymous_login() {
        const auth = (0, auth_1.getAuth)();
        await (0, auth_1.signInAnonymously)(auth)
            .then((userCredential) => {
            this.result.message = 'Successful';
            this.result.result = userCredential.user;
            console.log(userCredential.user);
        })
            .catch((error) => {
            this.result.message = error.code;
            this.result.result = '';
        });
        return this.result;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map