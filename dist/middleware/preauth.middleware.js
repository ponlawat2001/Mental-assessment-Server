"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("firebase-admin");
let PreauthMiddleware = class PreauthMiddleware {
    constructor() {
        require('dotenv').config();
        const firebaseparam = {
            type: process.env.type,
            projectId: process.env.project_id,
            privateKeyId: process.env.project_id,
            privateKey: process.env.private_key,
            clientEmail: process.env.client_email,
            clientId: process.env.client_id,
            authUri: process.env.auth_uri,
            tokenUri: process.env.token_uri,
            authProviderX509CertUrl: process.env.auth_provider_x509_cert_url,
            clientX509CertUrl: process.env.client_x509_cert_url,
            universeDomain: process.env.universe_domain,
        };
        this.defaultAppadmin = firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(firebaseparam),
            storageBucket: process.env.storageBucket,
        });
    }
    accessDenied(url, res) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied',
        });
    }
    unauthorized(res) {
        res.status(401).json({
            message: 'Unauthorized',
        });
    }
    use(req, res, next) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.defaultAppadmin
                .auth()
                .verifyIdToken(token.replace('Bearer ', ''))
                .then(async (decodedToken) => {
                const user = {
                    email: decodedToken.email,
                };
                req['user'] = user;
                next();
            })
                .catch((error) => {
                console.error(error);
                this.accessDenied(req.url, res);
            });
        }
        else {
            this.unauthorized(res);
        }
    }
};
PreauthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PreauthMiddleware);
exports.default = PreauthMiddleware;
//# sourceMappingURL=preauth.middleware.js.map